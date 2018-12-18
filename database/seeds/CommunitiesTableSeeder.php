<?php

use Illuminate\Database\Seeder;
use App\Community;

class CommunitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Community::class, 500)->create();
        $this->command->info('Community table seeded!');
    }
}
