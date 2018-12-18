<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommunitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('communities', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
	        $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->unsignedInteger('builder_id');
            $table->timestamps();
            $table->foreign('builder_id')->references('id')->on('builders');

            // keep community and builder unique
            $table->index(['name', 'builder_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('communities');
    }
}
