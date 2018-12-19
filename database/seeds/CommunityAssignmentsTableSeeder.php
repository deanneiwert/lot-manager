<?php

use Illuminate\Database\Seeder;
use App\CommunityAssignment;

class CommunityAssignmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // go through all the users
        App\User::all()->each(function($user) {
            
            // get the list of communities associated with the user's builder
            $communities = App\Community::where('builder_id', $user->builder_id)->get();
            
            // if at least one community found
            if($communities->count() > 0){

                // assign this user one of the communities randomly
                $community = $communities->random();
                $assignment = new CommunityAssignment;
                $assignment->user_id = $user->id;
                $assignment->community_id = $community->id;
                $assignment->save();
            }
        });
        $this->command->info('Community Assignments table seeded!');
    }
}
