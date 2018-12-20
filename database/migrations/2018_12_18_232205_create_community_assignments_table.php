<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommunityAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('community_assignments', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('community_id');
            $table->unsignedInteger('user_id');
            $table->timestamps();

            $table->foreign('community_id')->references('id')->on('communities');
            $table->foreign('user_id')->references('id')->on('users');

            // keep community and user unique
            $table->unique(['community_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('community_assignments');
    }
}
