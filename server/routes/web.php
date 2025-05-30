<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TimeslotController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [CourseController::class, 'index']);
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/offer-item', [OfferController::class, 'index']);
Route::get('/inquiries', [InquiryController::class, 'index']);
Route::get('/sessions', [SessionController::class, 'index']);
Route::get('/timeslots', [TimeslotController::class, 'index']);
