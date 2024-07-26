<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $payload = $request->validated();

        try {
            $payload["password"] = Hash::make($payload["password"]);
            User::create($payload);

            return response()->json([
                "message" => "Account created successfully"
            ], 200);
        } catch (\Exception $err) {
            Log::info("Register error => " . $err->getMessage());
            return response()->json([
                "message" => "Something went wrong, please try again later!"
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $payload = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        try {
            $user = User::where("email", $payload['email'])->first();

            if ($user) {
                if (!Hash::check($payload['password'], $user->password)) {
                    return response()->json(["status" => 401, "message" => "Invalid Credentials"]);
                }

                $token = $user->createToken("web")->plainTextToken;
                $authRes = array_merge($user->toArray(), ["token" => $token]);
                return response()->json([
                    "message" => "Logged in successfully",
                    "user" => $authRes
                ]);
            }
            return response()->json(["message" => "Invalid Credentials"], 401);
        } catch (\Exception $err) {
            Log::info("Login error => " . $err->getMessage());
            return response()->json([
                "message" => "Something went wrong, please try again later!"
            ], 500);
        }
    }

    public function checkCredentials(Request $request)
    {
        $payload = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        try {
            $user = User::where("email", $payload['email'])->first();

            if ($user) {
                if (!Hash::check($payload['password'], $user->password)) {
                    return response()->json(["message" => "Invalid Credentials"], 401);
                }

                $token = $user->createToken("web")->plainTextToken;
                $authRes = array_merge($user->toArray(), ["token" => $token]);
                return response()->json([
                    "status" => 200,
                    "message" => "Logged in successfully",
                ]);
            }
            return response()->json(["message" => "Invalid Credentials"], 401);
        } catch (\Exception $err) {
            Log::info("Login credentials error => " . $err->getMessage());
            return response()->json([
                "message" => "Something went wrong, please try again later!"
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return ["message" => "Logged out successfully!"];
        } catch (\Exception $err) {
            Log::info("Logout credentials error => " . $err->getMessage());
            return response()->json([
                "message" => "Something went wrong, please try again later!"
            ], 500);
        }
    }
}
