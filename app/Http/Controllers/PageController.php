<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function __construct(){
        $this->middleware('LoginAccess')->only(['songs_page']);
    }

    public function login_page()
    {
        return view('login');
    }
    
    public function songs_page()
    {
        return view('songs');
    }
}
