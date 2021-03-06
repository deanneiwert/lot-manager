<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::get('refresh', 'AuthController@refresh');

    Route::group(['middleware' => 'auth:api'], function(){
        Route::get('user', 'AuthController@user');
        Route::post('logout', 'AuthController@logout');
    });
});

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('users', 'UserController@index')->middleware('isAdmin');
    Route::get('users/{userId}', 'UserController@getUser')->middleware('isAdmin');
    Route::get('communities', 'CommunityController@index')->middleware('isAdmin');
    Route::get('communities/lots/{communityId}', 'CommunityController@getLots');
    Route::post('communities/saveLot', 'CommunityController@saveLot');
    Route::get('builders', 'BuilderController@index')->middleware('isAdmin');
    Route::get('builders/{builderId}', 'BuilderController@getBuilder')->middleware('isAdmin');
    Route::get('lotStatuses/{builderId}', 'LotStatusController@index');
    Route::post('setLotStatuses', 'LotStatusController@set')->middleware('isAdmin');
});
