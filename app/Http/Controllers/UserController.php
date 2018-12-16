<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request, int $pageSize, string $nameFilter = "") {
        //$users = User::all();
        //$users = User::paginate($pageSize);

        // filter on name field, then paginate
        $users = User::where('name', 'like', '%' . $nameFilter . '%')->paginate($pageSize);

        // join role table to data to get role.name
        $users->load('role');
        return response()->json(
            [
                'status' => 'success',
                'users' => $users->toArray()
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
