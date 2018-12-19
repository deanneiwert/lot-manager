<?php

namespace App\Http\Controllers;

use App\Community;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
    public function index(Request $request, int $pageSize, string $nameFilter = "") {
        // filter on name field, then paginate
        // include builder and community assigment info
        $communities = Community::with(
            'builder:id,name',
            'communityAssignment:id,user_id,community_id',
            'communityAssignment.user:id,name,role_id',
            'communityAssignment.user.role:id,name')
            ->where('name', 'like', '%' . $nameFilter . '%')
            ->paginate($pageSize);

        return response()->json(
            [
                'status' => 'success',
                'communitiesChunk' => $communities->toArray()
            ], 200);
    }
}
