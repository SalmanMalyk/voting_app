<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Enums\UserType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function loginView(Request $request)
    {
        if (auth()->check()) {
            return redirect()->intended('admin');
        }
        return view('auth.login');
    }
    
    public function attempt(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required'
        ]);

        $user = User::where(['email' => $request->email, 'status' => true])->first();

        if ($user && Hash::check($request->password, $user->password)) {
            if (in_array($user->user_type, [UserType::Admin, UserType::SuperAdmin]) ) {
                Auth::login($user, $request->remember ? true : false);
                return redirect()->intended('admin');
            } else {
                return redirect()->back()->with('status', 'Stop! You don\'t have correct access.');
            }
        } else {
            return redirect()->back()->with('status', 'Oh! Invalid credentials.');
        }
    }

    public function logout()
    {
        Session::flush();
        Auth::logout();

        return redirect()->route('dashboard.loginView');
    }
}
