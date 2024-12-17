<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the input fields
        $validated = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Retrieve admin by username
        $admin = Admin::where('username', $request->username)->first();

        // Check if the admin exists and the password matches (plain text comparison)
        if (!$admin || $admin->password !== $request->password) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        // Generate an authentication token
        $token = $admin->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'admin' => $admin,
        ]);
    }
}
