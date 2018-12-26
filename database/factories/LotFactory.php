<?php

use Faker\Generator as Faker;

$factory->define(App\Lot::class, function (Faker $faker, array $params) {

    $communityId = $params['community_id'];

    return [
        'street_address' => $faker->streetAddress,
        'lot_status_id' => $faker->
            randomElement(App\LotStatus::
            join('builders','lot_statuses.builder_id','=','builders.id')->
            join('communities','builders.id','=','communities.builder_id')->
            where('communities.id', $communityId)->pluck('lot_statuses.id')->toArray()),
    ];
});
