<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\SessionController;
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

Route::get('/inquiries', [InquiryController::class, 'index']);
Route::get('/inquiries/{id}', [InquiryController::class, 'getInquiryById']);
Route::post('/inquiries', [InquiryController::class, 'saveInquiry']);
Route::put('/inquiries/{id}', [InquiryController::class, 'updateInquiry']);
Route::delete('/inquiries/{id}', [InquiryController::class, 'deleteInquiry']);

Route::get('/sessions', [SessionController::class, 'index']);
Route::get('/sessions/{id}', [SessionController::class, 'getSessionById']);
Route::post('/sessions', [SessionController::class, 'saveSession']);
Route::put('/sessions/{id}', [SessionController::class, 'updateSession']);
Route::delete('/sessions/{id}', [SessionController::class, 'deleteSession']);
