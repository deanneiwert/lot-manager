<?php

use Illuminate\Database\Seeder;
use App\Lots;

class LotsTableSeeder extends Seeder
{

    const MAX_LOT_COUNT = 20;
    const MIN_LOT_COUNT = 0;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // go through all the communities and create lot records
        App\Community::all()->each(function($community) {
            $lotNumber = 1;
            $lotCount = rand(self::MIN_LOT_COUNT,self::MAX_LOT_COUNT);
            $this->command->info("Community ".$community->id.": creating ".$lotCount." lot records");

            // generate between min and max lots for each community
            // auto increment the lot number starting with 1
            factory(App\Lot::class, $lotCount)->create([
                'community_id' => $community->id
            ])->each(function ($lot) use(&$lotNumber){
                $lot->lot_number = $lotNumber ?: 1;
                $lot->save();
                $lotNumber++;
            });
        });

        $this->command->info('Lots table seeded!');
    }
}
