<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


// views
Route::get('login', 'PageController@login_page');
Route::get('songs', 'PageController@songs_page');

// functions
Route::post('login-process', 'LoginController@login');
Route::get('logout-process', 'LoginController@logout');


// resource
Route::post('save-song', 'SongsController@saveSong');
Route::get('load-song', 'SongsController@loadSong');
Route::delete('delete-song', 'SongsController@deleteSong');
