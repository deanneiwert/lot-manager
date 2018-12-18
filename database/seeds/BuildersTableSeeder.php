<?php

use Illuminate\Database\Seeder;
use App\Builder;

class BuildersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Builder::class, 100)->create();
        $this->command->info('Builders table seeded!');
    }
}
