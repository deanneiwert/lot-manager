<?php

namespace App\Http\Controllers;

use App\Community;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
    public function index(Request $request, ?string $builderId = "") {

        $pageSize = $request['pageSize'];

        // filter on name field, then paginate
        // include builder and community assigment info
        $communities = Community::with(
            'builder:id,name',
            'communityAssignment:id,user_id,community_id',
            'communityAssignment.user:id,name,role_id',
            'communityAssignment.user.role:id,name')
            ->where('name', 'like', '%' . $request['nameFilter'] . '%');

        if($pageSize){
            $communities = $communities->paginate($pageSize);
        }
        else {
            $communities = ['data' => $communities-get()];
        }

        return response()->json(
            [
                'status' => 'success',
                'communitiesChunk' => $communities->toArray()
            ], 200);
    }

    public function getLots(Request $request, string $communityId) {
        $community = Community::with('lots', 'lots.lotStatus')->where("id", $communityId)->first();

        return response()->json(
            [
                'status' => 'success',
                'lots' => $community->lots,
            ], 200);
    }
}
