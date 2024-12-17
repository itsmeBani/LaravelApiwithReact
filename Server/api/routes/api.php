<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return response()->json([
        'message' => 'Login successful',
        'data' => $request->user(),
        'isAuth' => true

    ]);

});

Route::post('/login', [AuthController::class, 'login']);
Route::put('/UpdateCustomers/{id}', [CustomerController::class, 'update']);
Route::post('/AddProduct', [ProductController::class, 'AddProduct']);
Route::put('/UpdateProduct/{id}', [ProductController::class, 'updateProduct']);
Route::delete('/DeleteProduct/{id}', [ProductController::class, 'deleteProduct']);
