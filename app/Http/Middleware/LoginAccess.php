<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
class LoginAccess
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
        $user_type = Auth::user()['user_type'];
        if (Auth::check()) 
        {
            if ($user_type === 'Admin') 
            {
                return $next($request);
            } 
            else 
            {
                return $next($request);
            }
        } 
        else 
        {
            return redirect('login');
        }
    }
}
