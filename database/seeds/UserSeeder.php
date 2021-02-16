<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username'  => 'george',
            'password'  => Hash::make('123'),
            'name'      => 'George Almenanza',
            'user_type' => 'Admin',
        ]);
    }
}
