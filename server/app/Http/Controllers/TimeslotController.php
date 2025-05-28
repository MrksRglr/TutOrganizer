<?php

namespace App\Http\Controllers;

use App\Models\Timeslot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TimeslotController extends Controller
{
    public function index() : JsonResponse {
        $timeslots = Timeslot::all();
        return response()->json($timeslots, 200);
    }

    public function getTimeslotById($id) : JsonResponse {
        $timeslot = Timeslot::where('id', $id)->first();
        return $timeslot != null ? response()->json($timeslot, 200) : response()
            ->json(['message' => 'Kein Termin unter dieser ID gefunden.'], 404);
    }

    public function saveTimeslot(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $timeslot = Timeslot::create($request->all());
            DB::commit();
            return response()->json($timeslot, 200);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Timeslot konnte nicht angelegt werden. " . $e->getMessage()], 500);
        }
    }

    public function updateTimeslot(Request $request, int $id) : JsonResponse {
        DB::beginTransaction();
        try {
            $timeslot = Timeslot::with('session_id')->where('code', $id)->first();
            if ($timeslot != null) {
                $timeslot->update($request->all());
                DB::commit();
                return response()->json($timeslot, 200);
            } else {
                return response()->json(["Timeslot mit der ID '$id' konnte nicht gefunden werden."], 404);
            }
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Timeslot konnte nicht aktualisiert werden." . $e->getMessage()], 500);
        }
    }

    public function deleteTimeslot(Request $request, int $id) : JsonResponse {
        $timeslot = Timeslot::where('code', $id)->first();
        if ($timeslot != null) {
            $timeslot->delete();
            return response()->json("Timeslot mit der ID '$id' wurde gelöscht.", 200);
        } else {
            return response()->json(["Timeslot mit der ID '$id' konnte nicht gefunden werden."], 404);
        }
    }

}
