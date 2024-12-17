<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function getCustomers()
    {
        $customer = Customer::all();
        return response()->json($customer);
    }





    public function update(Request $request, $user_id)
    {
        try {
            // Find customer by user_id
            $customer = Customer::where('user_id', $user_id)->first();

            if (!$customer) {
                return response()->json(['message' => 'Customer not found'], 404);
            }

            // Update customer data
            $customer->update([
                'image' => $request->image,
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'address' => $request->address,
            ]);

            return response()->json(['message' => 'Customer updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating customer: ' . $e->getMessage()], 500);
        }
    }





}
