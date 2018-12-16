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
        factory(App\User::class, 50)->create();
        User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('admin'),
            'role_id' => 1
        ]);
        User::create([
            'name' => 'Sales Agent',
            'email' => 'sales@test.com',
            'password' => Hash::make('sales'),
            'role_id' => 2
        ]);
        User::create([
            'name' => 'Sales Manager',
            'email' => 'manager@test.com',
            'password' => Hash::make('manager'),
            'role_id' => 3
        ]);
        $this->command->info('Users table seeded!');
    }
}
