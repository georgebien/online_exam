<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Redirect;
use Session;
use Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->except('_token');

        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) 
        {
            return response()->json(['errors' => $validator->errors()]);
        } 
        else 
        {
            if (Auth::attempt($data)) 
            {
                return ['true', Auth::user()];
            } 
            else 
            {
                return 'false';
            }
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        Session::flush();
        return Redirect::to('login');
    }
}
