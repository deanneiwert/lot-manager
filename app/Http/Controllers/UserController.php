<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request, int $pageSize, string $nameFilter = "") {
        // filter on name field, then paginate
        $users = User::where('name', 'like', '%' . $nameFilter . '%')->paginate($pageSize);

        // join role and builder table to data to get role.name and builder.name
        $users->load('role');
        $users->load('builder');

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
