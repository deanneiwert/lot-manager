<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommunityAssignment extends Model
{
    /**
     * Get the community record associated with the assignment.
     */
    public function community()
    {
        return $this->belongsTo('App\Community');
    }

    /**
     * Get the user record associated with the assignment.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
