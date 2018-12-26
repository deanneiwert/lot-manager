<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
     /**
     * Get the builder record associated with the community.
     */
    public function builder()
    {
        return $this->belongsTo('App\Builder');
    }

    /**
     * get the assignments associated with this community
     */
    public function communityAssignment()
    {
        return $this->hasMany('App\CommunityAssignment');
    }

    /**
     * get the lots associated with this community
     */
    public function lots()
    {
        return $this->hasMany('App\Lot');
    }
}
