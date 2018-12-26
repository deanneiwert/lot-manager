<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lots', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('community_id');
            $table->smallInteger('lot_number')->nullable();
            $table->string('street_address')->nullable();
            $table->unsignedInteger('lot_status_id')->nullable();
            $table->timestamps();

            $table->foreign('community_id')->references('id')->on('communities');
            $table->foreign('lot_status_id')->references('id')->on('lot_statuses');

            // keep lot number and community unique
            $table->unique(['community_id', 'lot_number']);

            // keep address and community unique
            $table->unique(['community_id', 'street_address']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lots');
    }
}
