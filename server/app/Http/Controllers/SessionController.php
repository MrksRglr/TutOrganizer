<?php /** @noinspection LanguageDetectionInspection */

namespace App\Http\Controllers;

use App\Models\Session;
use App\Models\Timeslot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SessionController extends Controller
{

    public function index() : JsonResponse {
        $sessions = Session::with('timeslots')->get();
        return response()->json($sessions, 200);
    }

    public function getSessionById($id) : JsonResponse {
        $session = Session::with('timeslots')->where('id', $id)->first();
        return $session != null ? response()->json($session, 200) : response()
            ->json(["Keine Session unter dieser ID gefunden. "], 404);
    }

    public function saveSession(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $session = Session::create($request->except('timeslots'));

            foreach($request->timeslots as $slot) {
                $dateIsValid = now()->lessThan($slot['start_time']);

                if(!$dateIsValid) {
                    DB::rollBack();
                    return response()->json(["Ein Termin liegt in der Vergangenheit. "], 500);
                } elseif($this->schedulingConflict($slot['start_time'], $slot['end_time'])) {
                    DB::rollBack();
                    return response()->json(["Ein Timeslot überschneidet sich mit einem anderen Termin. "], 500);
                }

                $session->timeslots()->create([
                    'start_time' => $slot['start_time'],
                    'end_time' => $slot['end_time'],
                ]);
            }

            DB::commit();
            return response()->json($session->load('timeslots'), 200);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Termin konnte nicht erstellt werden. " . $e->getMessage()], 500);
        }
    }

    // Funktion sucht in der Datenbank nach Terminkonflikten
    private function schedulingConflict($start, $end) : bool {
        return Timeslot::where(function ($query) use ($start, $end) {
            $query->where('start_time', '>=', $start)
                ->where('start_time', '<', $end);
        })->exists();
    }

    public function updateSession(Request $request, int $id) : JsonResponse {
        DB::beginTransaction();
        try {
            $session = Session::with('timeslots')->where('id', $id)->first();

            if ($session == null) {
                return response()->json(["Die Session mit der ID '$id' wurde nicht gefunden. "], 400);
            } else {
                $session->update($request->except('timeslots'));
                $session->timeslots()->delete();

                // timeslots Array durchlaufen und jeden Eintrag validieren
                foreach($request->timeslots as $slot) {
                    $dateIsValid = now()->lessThan($slot['start_time']);

                    if(!$dateIsValid) {
                        DB::rollBack();
                        return response()->json(["Ein Termin liegt in der Vergangenheit. "], 500);
                    } elseif ($this->schedulingConflict($slot['start_time'], $slot['end_time'])) {
                        DB::rollBack();
                        return response()->json(["Ein Timeslot überschneidet sich mit einem anderen Termin. "], 500);
                    }

                    $session->timeslots()->create([
                        'start_time' => $slot['start_time'],
                        'end_time' => $slot['end_time'],
                    ]);
                }
                DB::commit();
                // Hilfe von Chat-GPT beim debuggen - ursprünglich wurde das Session-Objekt
                // mit den "alten" timeslots bei der Rückgabe angezeigt
                return response()->json($session->fresh('timeslots'), 200);
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
