<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SessionController extends Controller
{
    public function index() : JsonResponse {
        $sessions = Session::all();
        return response()->json($sessions, 200);
    }

    public function getSessionById($id) : JsonResponse {
        $session = Session::where('id', $id)->select('course_id', 'user_id', 'status')->first();
        return $session != null ? response()->json($session, 200) : response()
            ->json(['message' => 'Kein Termin unter dieser ID gefunden.'], 404);
    }

    public function saveSession(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $dateIsValid = now()->lessThan($request->start_time);
            if ($dateIsValid) {
                $session = Session::create($request->all());
                DB::commit();
                return response()->json($session, 200);
            } else {
                return response()->json(["Zeitfenster ungültig -
                gewünschter Termin liegt in der Vergangenheit oder es liegt eine
                Terminüberschneidung vor."], 500);
            }
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Termin konnte nicht erstellt werden." . $e->getMessage()], 500);
        }
    }

    public function updateSession(Request $request, int $id) : JsonResponse {
        DB::beginTransaction();
        try {
            $dateIsValid = now()->lessThan($request->start_time);
            $session = Session::where('id', $id)->first();
            if ($session != null) {
                $session->update($request->all());
                DB::commit();
                return response()->json($session, 200);
            } elseif (!$dateIsValid) {
                return response()->json(["Zeitfenster ungültig - Termin mit ID
                '$id' liegt in der Vergangenheit oder es liegt eine Terminüberschneidung vor."], 500);
            }
            else {
                return response()->json(["Termin mit ID '$id' konnte nicht gefunden werden."], 404);
            }
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Termin konnte nicht aktualisiert werden. " . $e->getMessage()], 500);
        }
    }

    public function deleteSession(int $id) : JsonResponse {
        $session = Session::where('id', $id)->first();
        if ($session != null) {
            $session->delete();
            return response()->json("Termin mit der ID '$id' wurde gelöscht.", 200);
        } else {
            return response()->json(["Termin mit der ID '$id' konnte nicht gefunden werden."], 404);
        }
    }

}
