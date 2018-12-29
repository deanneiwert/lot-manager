<?php

namespace App\Http\Controllers;

use DB;
use App\Community;
use App\Lot;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
    /**
     * Get paginated community data including builder and assignment data
     */
    public function index(Request $request) {

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

    /**
     * Get lots for passed in community id
     */
    public function getLots(Request $request, string $communityId) {
        $community = Community::with('lots', 'lots.lotStatus')->where("id", $communityId)->first();

        return response()->json(
            [
                'status' => 'success',
                'lots' => $community->lots,
            ], 200);
    }

    /**
     * Save lot data to corresponding lot record
     */
    public function saveLot(Request $request) {
        $id = $request->id;
        $lot_number = $request->lot_number;
        $lot_status_id = $request->lot_status_id;
        $street_address = $request->street_address;

        // attempt to update the record
        DB::beginTransaction();
        try {
            $dbLot = Lot::find($id);
            $dbLot->lot_number = $lot_number;
            $dbLot->lot_status_id = $lot_status_id;
            $dbLot->street_address = $street_address;
            $dbLot->save();
            DB::commit();
        } catch (\Exception $ex) {
            DB::rollback();
            return response()->json(['status' => 'error', 'error' => $ex->getMessage()], 500);
        }

        $lot = Lot::with("lotStatus")->where("id", $id)->first();

        // transaction successed, return updated lot
        return response()->json(
            [
                'status' => 'success',
                'lot' => $lot
            ], 200);
    }
}
