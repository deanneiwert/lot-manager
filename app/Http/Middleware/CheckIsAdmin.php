<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        // $adminRole = $App\Roles::where('name', 'Admin')->get();

        // foreach($categories AS $category)
        // {
        //     define($category['category_name'],$category['category_id']);
        // }

        if(Auth::user()->role_id === 1) {
            return $next($request);
        }
        else {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
}
