<?php

namespace App\Http\Controllers\Api\V1\Dispatcher;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Validation\ValidationException;

/**
 * @group Dispatcher API
 *
 * API endpoints for managing dispatcher app
 */

class LoginController extends BaseController
{
    /**
     * Dispatcher Login API.
     *
     * check if dispatcher info is correct. If valid credentials are endtered, returned auth token.
     * 
     * Otherwise, returned error message accordingly.
     * 
     * @bodyParam   email    string  required    The email of the  dispatcher.      Example: testuser@example.com
     * @bodyParam   password    string  required    The password of the  dispatcher.   Example: secret
     *
     * @response 200 {
     *  "access_token": "eyJ0eXA...",
     *  "user": "{
     *      "id": 1,
     *      "name": "John Doe"
     *  }",
     * }
     */
    public function authCheck(Request $request)
    {
        // VALIDATE DATA
        $request->validate([
            'email'     => 'required|email|string',
            'password'  => 'required|string'
        ]);

        // TODO: find active user against email
        $user = User::where('email', $request->email)->where('status', true)->first(['id', 'name', 'email', 'password']);

        if (!$user || !Hash::check($request->password, $user->password)) {
            $error = ValidationException::withMessages([
                'auth' => ["The provided credentials are incorrect"]
            ]);
            throw $error;
            // return $this->sendError('Unauthorised.', ['errors' => 'The provided credentials are incorrect.'], 403);
        } 
        // else if (!$user->hasRole('Dispatcher')) {
        //     $error = ValidationException::withMessages([
        //         'auth' => ["You're not authorized to login."]
        //     ]);
        //     throw $error;
        //     // return $this->sendError('Unauthorised.', ['errors' => "You're not authorized to login."], 403);
        // }

        // TODO: Delete previous token
        $user->tokens()->delete(); 
        
        // TODO: return data
        $data = [
            'token' => $user->createToken(config('app.name'))->plainTextToken,
            'user' => $user
        ];

        return $this->sendResponse($data, 'Dispatcher login successfully.');
    }

    /**
     * Dispatcher Login Check.
     *
     * check wether token is valid or not
     * Otherwise, returned error message accordingly.
     * 
     * @header Authorization Bearer <auth-token>     *
     * @response 200 {
     *  "success": true,
     *  "message": "Token is enabled.",
     * }
     * 
     * @response 403 {
     *  "success": false,
     *  "error": "Token is expired.",
     *  "data": {
     *      "error": [
     *          0: "You are disabled."
     *       ]
     *  }
     * }
     */
    public function verifyAuthToken()
    {
        if(auth()->check()) {
            return $this->sendResponse(true, 'Token is enabled.');
        } else {
            return $this->sendError('Token is expired.', ['error' => 'You are disabled.'], 403);
        }
    }
}
