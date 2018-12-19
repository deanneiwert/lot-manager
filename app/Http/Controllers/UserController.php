<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request, int $pageSize, string $nameFilter = "") {
        // filter on name field, then paginate
        // get role and builder from other tables
        $users = User::with('role','builder')->where('name', 'like', '%' . $nameFilter . '%')->paginate($pageSize);

        return response()->json(
            [
                'status' => 'success',
                'usersChunk' => $users->toArray()
            ], 200);
    }

    public function show(Request $request, $id) {
        $user = User::find($id);
        return response()->json(
            [
                'status' => 'success',
                'user' => $user->toArray()
            ], 200);
    }

}
