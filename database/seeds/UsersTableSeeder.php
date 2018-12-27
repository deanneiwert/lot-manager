<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 500)->create();
        // create 1 admin we can use to login
        User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('admin'),
            'role_id' => 1
        ]);
        // create 1 sales agent we can use to login
        factory(App\User::class, 1)->create([
            'email' => 'sales@test.com',
            'password' => Hash::make('sales'),
        ]);
        // create 1 sales maanger we can use to login
        User::create([
            'name' => 'Sales Manager',
            'email' => 'manager@test.com',
            'password' => Hash::make('manager'),
            'role_id' => 3
        ]);
        $this->command->info('Users table seeded!');
    }
}
