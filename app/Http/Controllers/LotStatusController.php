<?php

namespace App\Http\Controllers;

use DB;
use App\LotStatus;
use Illuminate\Http\Request;

class LotStatusController extends Controller
{
    public function index(Request $request, int $builderId) {
        // filter on builder 
        $lotStatuses = LotStatus::orderBy('order')->where('builder_id', $builderId)->get();

        return response()->json(
            [
                'status' => 'success',
                'lotStatuses' => $lotStatuses->toArray()
            ], 200);
    }

    public function set(Request $request) {
        $lotStatuses = $request->lotStatuses;
        $lotStatusCount = count($lotStatuses);
        $builderId = $request->builderId;

        // attempt to go through all the statuses and update the order creating new records when necessary
        DB::beginTransaction();
        try {
            for($i=0; $i< $lotStatusCount; $i++){
                $postedStatus = (object)$lotStatuses[$i];
                $dbStatus = LotStatus::find($postedStatus->id);
                if(!$dbStatus){
                    $dbStatus = new LotStatus();
                }
                $dbStatus->name = $postedStatus->name;
                $dbStatus->order = $i+1;
                $dbStatus->builder_id = $builderId;
                $dbStatus->save();
            }
            DB::commit();
        } catch (\Exception $ex) {
            DB::rollback();
            return response()->json(['status' => 'error', 'error' => $ex->getMessage()], 500);
        }

        $lotStatuses = LotStatus::orderBy('order')->where('builder_id', $builderId)->get();

        // transaction successed, return updated lot statuses
        return response()->json(
            [
                'status' => 'success',
                'lotStatuses' => $lotStatuses->toArray()
            ], 200);
    }
}
