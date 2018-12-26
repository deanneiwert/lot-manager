<?php

namespace App\Http\Controllers;

use App\Builder;
use Illuminate\Http\Request;

class BuilderController extends Controller
{
    /**
     * Get all builders
     */
    public function index(Request $request) {

        $builders = Builder::orderBy('name')->get();

        return response()->json(
            [
                'status' => 'success',
                'builders' => $builders->toArray()
            ], 200);
    }

    /**
     * Get single builder
     */
    public function getBuilder(Request $request, string $builderId) {

        $builder = Builder::with("communities")->where("id", $builderId)->first();

        return response()->json(
            [
                'status' => 'success',
                'builder' => $builder,
            ], 200);
    }
}
