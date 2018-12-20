<?php

use Illuminate\Database\Seeder;
use App\LotStatus;

class LotStatusesTableSeeder extends Seeder
{

    const DEFAULT_STATUS = array('in permit','site prep','foundation','under floor framing','vertical framing','plumbing, electrical, HVAC', 'insulation', 'drywall','texture, trim, cabinets', 'paint','interior finishes', 'complete');
    private $defaultStatusCount;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->defaultStatusCount = count(self::DEFAULT_STATUS);

        // go through all the builders
        App\Builder::all()->each(function($builder) {            

            // create default lot status records for each builder 
            for($i = 0; $i< $this->defaultStatusCount; $i++){
                $status = new LotStatus;
                $status->name = self::DEFAULT_STATUS[$i];
                $status->order = $i+1;
                $status->builder_id = $builder->id;
                $status->save();
            }
        });

        $this->command->info('Lot status table seeded!');
    }
}
