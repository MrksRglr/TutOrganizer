<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OfferController extends Controller
{
    public function index() : JsonResponse {
        $offers = Offer::with('course', 'user')->get();
        return response()->json($offers, 200);
    }

    public function getOfferById($id) : JsonResponse {
        $offer = Offer::with('course', 'user')->where('id', $id)->get();
        return $offer != null ? response()->json($offer, 200) : response()
            ->json(['message' => 'Kein Angebot unter dieser ID gefunden.'], 404);
    }

    public function saveOffer(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $offer = Offer::create($request->all());
            DB::commit();
            return response()->json($offer, 200);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Angebot konnte nicht erstellt werden. " . $e->getMessage()], 500);
        }
    }

    public function updateOffer(Request $request, int $id) : JsonResponse {
        DB::beginTransaction();
        try {
            $offer = Offer::where('id', $id)->first();
            if ($offer != null) {
                $offer->update($request->all());
                $offer->save();
                DB::commit();
                return response()->json($offer, 200);
            } else {
                return response()->json(["Angebot mit ID '$id' konnte nicht gefunden werden."], 404);
            }
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Angebot konnte nicht aktualisiert werden. " . $e->getMessage()], 500);
        }
    }

    public function deleteOffer(int $id) : JsonResponse {
        $offer = Offer::where('id', $id)->first();
        if ($offer != null) {
            $offer->delete();
            return response()->json("Angebot mit der ID '$id' wurde gelöscht.", 200);
        } else {
            return response()->json(["Angebot mit der ID '$id' konnte nicht gefunden werden."], 404);
        }
    }
}
