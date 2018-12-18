<?php

use Faker\Generator as Faker;

$factory->define(App\Builder::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
    ];
});
