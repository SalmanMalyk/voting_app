<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Enums\UserType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function loginView(Request $request)
    {
        return view('auth.login');
    }

    public function attempt(Request $request)
    {
        $request->validate([
            'email' => "required|email|exists:admins|min:5|max:191",
            'password' => "required|string|min:4|max:255"
        ], [
            'email.exists' => 'These credentials do not match our records.'
        ]);

        $user = Admin::where(['email' => $request->email, 'status' => true])->first();

        if ($user && Hash::check($request->password, $user->password)) {
            if (in_array($user->user_type, [UserType::Admin, UserType::SuperAdmin])) {
                Auth::guard('admin')->login($user, $request->filled('remember'));
                return redirect()->intended(route('dashboard.index'));
            } else {
                return redirect()
                    ->back()
                    ->withInput()
                    ->with('status', 'Stop! You don\'t have correct access.');
            }
        } else {
            return redirect()
                ->back()
                ->withInput()
                ->with('status', 'Oh! Invalid credentials.');
        }
    }

    public function logout()
    {
        Session::flush();
        Auth::guard('admin')->logout();

        return redirect()->route('dashboard.loginView');
    }
}