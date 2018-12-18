<?php

use Faker\Generator as Faker;

$factory->define(App\Community::class, function (Faker $faker) {
    return [
        'name' => $faker->streetName,
        'city' => $faker->city,
        'state' => $faker->state,
        'zip' => $faker->postcode,
        'builder_id' => $faker->randomElement(App\Builder::pluck('id')->toArray()),
    ];
});
