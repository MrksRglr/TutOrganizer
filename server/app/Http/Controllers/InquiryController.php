<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InquiryController extends Controller
{
    public function index() : JsonResponse {
        $inquiries = Inquiry::with('user', 'offer.course', 'offer.user')->get();
        return response()->json($inquiries, 200);
    }

    public function getInquiryById($id) : JsonResponse {
        $inquiry = Inquiry::with('user', 'offer.course', 'offer.user')->where('id', $id)->get();
        return $inquiry != null ? response()->json($inquiry, 200) : response()
            ->json(['message' => 'Keine Anfrage unter dieser ID gefunden.'], 404);
    }

    public function saveInquiry(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $inquiry = Inquiry::create($request->all());
            DB::commit();
            return response()->json($inquiry, 200);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Anfrage konnte nicht erstellt werden." . $e->getMessage()], 500);
        }
    }

    public function updateInquiry(Request $request, int $id) : JsonResponse {
        DB::beginTransaction();
        try {
            $inquiry = Inquiry::where('id', $id)->select('course_id', 'user_id')->first();
            if ($inquiry != null) {
                $inquiry->update($request->all());
                $inquiry->save();
                DB::commit();
                return response()->json($inquiry, 200);
            } else {
                return response()->json(["Anfrage mit ID '$id' konnte nicht gefunden werden."], 404);
            }
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Anfrage konnte nicht aktualisiert werden. " . $e->getMessage()], 500);
        }
    }

    public function deleteInquiry(int $id) : JsonResponse {
        $offer = Inquiry::where('id', $id)->first();
        if ($offer != null) {
            $offer->delete();
            return response()->json("Anfrage mit der ID '$id' wurde gelöscht.", 200);
        } else {
            return response()->json(["Anfrage mit der ID '$id' konnte nicht gefunden werden."], 404);
        }
    }

}
