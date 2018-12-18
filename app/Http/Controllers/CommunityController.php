<?php

namespace App\Http\Controllers;

use App\Community;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
    public function index(Request $request, int $pageSize, string $nameFilter = "") {
        // filter on name field, then paginate
        $communities = Community::where('name', 'like', '%' . $nameFilter . '%')->paginate($pageSize);

        // join builder table to data to get builder.name
        $communities->load('builder');

        return response()->json(
            [
                'status' => 'success',
                'communitiesChunk' => $communities->toArray()
            ], 200);
    }
}
