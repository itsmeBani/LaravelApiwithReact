<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use http\Client\Response;
use Illuminate\Http\Request;

class OrderController extends Controller

{

    public function index()
    {
        // Fetch users with their carts and products
        $usersWithOrders = Customer::whereHas('carts') // Ensures only users with orders are fetched
        ->with(['carts.product']) // Load carts and related products
        ->get();

        // Return the data as JSON
        return response()->json($usersWithOrders);
    }
    public function deleteOrder($id)
    {
        // Try to find the order
        $order = Order::find($id);

        if ($order) {
            // If found, delete the order
            $order->delete();
            return response()->json(['message' => 'Order deleted successfully.']);
        }

        // If order not found, return a 404 response
        return response()->json(['message' => 'Order not found.']);
    }
    public function deleteCartByUserId($user_id)
    {
        // Delete all cart records for the given user_id
        $deleted = Order::where('user_id', $user_id)->delete();

        // Check if records were deleted
        if ($deleted) {
            return response()->json(['message' => 'Cart records deleted successfully.'], 200);
        } else {
            return response()->json(['message' => 'No records found for the given user_id.'], 404);
        }
    }


}
