<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLotStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lot_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->smallInteger('order');
            $table->string('name');
            $table->unsignedInteger('builder_id');
            $table->timestamps();

            $table->foreign('builder_id')->references('id')->on('builders');

            // keep community and user unique
            $table->unique(['builder_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lot_statuses');
    }
}
