<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/customers', [\App\Http\Controllers\CustomerController::class, 'getCustomers']); // Fetch all phones
Route::get('/products', [\App\Http\Controllers\ProductController::class, 'getProducts']); // Fetch all phones
Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'index']); // Fetch all phones
Route::get('/order/{id}', [OrderController::class, 'deleteOrder']);
Route::get('/AllOrder/{id}', [OrderController::class, 'deleteCartByUserId']);
Route::put('/UpdateCustomers/{id}', [CustomerController::class, 'update']);


