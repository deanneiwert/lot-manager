<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get paginated user data including builder and role info
     */
    public function index(Request $request) {
        // filter on name field, then paginate
        // get role and builder from other tables
        $users = User::with('role','builder')->where('name', 'like', '%' . $request['nameFilter'] . '%')->paginate($request['pageSize']);

        return response()->json(
            [
                'status' => 'success',
                'usersChunk' => $users->toArray()
            ], 200);
    }

    /**
     *
     */
    public function show(Request $request, $id) {
        $user = User::find($id);
        return response()->json(
            [
                'status' => 'success',
                'user' => $user->toArray()
            ], 200);
    }

}
