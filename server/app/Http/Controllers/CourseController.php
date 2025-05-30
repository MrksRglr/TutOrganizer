<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function index() : JsonResponse
    {
        $courses = Course::all();
        return response()->json($courses, 200);
    }

    public function getCourseByCode($code) : JsonResponse {
        $course = Course::where('code', $code)->select('name', 'code', 'description')->first();
        return $course != null ? response()->json($course, 200) : response()
            ->json(['message' => 'Kein Kurs unter diesem Code gefunden.'], 404);
    }

    public function saveCourse(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $course = Course::create($request->all());
            DB::commit();
            return response()->json($course, 200);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Kurs konnte nicht angelegt werden." . $e->getMessage()], 500);
        }
    }

    public function updateCourse(Request $request, string $code) : JsonResponse {
        DB::beginTransaction();
        try {
            $course = Course::with('offer-item')->where('code', $code)->first();
            if ($course != null) {
                $course->update($request->all());
                $course->save();
                DB::commit();
                return response()->json($course, 200);
            } else {
                return response()->json(["Kurs mit Code '$code' konnte nicht gefunden werden."], 404);
            }
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["Kurs konnte nicht aktualisiert werden." . $e->getMessage()], 500);
        }
    }

    public function deleteCourse(string $code) : JsonResponse {
        $course = Course::where('code', $code)->first();
        if ($course != null) {
            $course->delete();
            return response()->json("Kurs '$code, $course->name' wurde gelöscht.", 200);
        } else {
            return response()->json(["Kurs '$course->name' mit Code '$code' konnte nicht gefunden werden."], 404);
        }
    }
}
