<?php

namespace App\Http\Controllers;

use App\Builder;
use Illuminate\Http\Request;

class BuilderController extends Controller
{
    public function index(Request $request) {
        
        $builders = Builder::orderBy('name')->get();

        return response()->json(
            [
                'status' => 'success',
                'builders' => $builders->toArray()
            ], 200);
    }
}
