<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\OfferController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{code}', [CourseController::class, 'getCourseByCode']);
Route::post('/courses', [CourseController::class, 'saveCourse']);
Route::put('/courses/{code}', [CourseController::class, 'updateCourse']);
Route::delete('/courses/{code}', [CourseController::class, 'deleteCourse']);

Route::get('/offers', [OfferController::class, 'index']);
Route::get('/offers/{id}', [OfferController::class, 'getOfferById']);
Route::post('/offers', [OfferController::class, 'saveOffer']);
Route::put('/offers/{id}', [OfferController::class, 'updateOffer']);
Route::delete('/offers/{id}', [OfferController::class, 'deleteOffer']);
