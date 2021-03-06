<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $v = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password'  => 'required|min:3|confirmed',
            'name' => 'required|unique:users',
        ]);
        if ($v->fails()) {
            return response()->json([ 'status' => 'error', 'errors' => $v->errors()], 422);
        }
        $user = new User;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->name = $request->name;
        $user->save();

        // login in newly registered user
        return $this->login($request);
    }

    /**
     * Login user and grab builder and community detail as well
     */
    public function login(Request $request) {
        $v = Validator::make($request->all(), [
            'email' => 'required|email',
            'password'  => 'required',
        ]);
        if ($v->fails()) {
            return response()->json(['status' => 'error','errors' => $v->errors()], 422);
        }
        $credentials = $request->only('email', 'password');
        if ($token = $this->guard()->attempt($credentials)) {
            $user = Auth::getUser();
            $user->load('role', 'builder', 'builder.communities','communityAssignment','communityAssignment.community');
            $user->token = $token;
            return response()->json($user, 200);
        }
        return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
    }

    public function logout() {
        $this->guard()->logout();
        return response()->json([
            'status' => 'success',
            'msg' => 'Logged out Successfully.'
        ], 200);
    }

    public function user(Request $request) {
        $user = User::find(Auth::user()->id);
        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    public function refresh() {
        if ($token = $this->guard()->refresh()) {
            return response()
                ->json(['status' => 'successs'], 200)
                ->header('Authorization', $token);
        }
        return response()->json(['error' => 'refresh_token_error'], 401);
    }

    private function guard() {
        return Auth::guard();
    }
}
