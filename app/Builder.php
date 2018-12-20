<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Builder extends Model
{
     /**
     * Get the community records associated with the builder.
     */
    public function communities()
    {
        return $this->hasMany('App\Community');
    }

    /**
     * Get the lot status records associated with the builder.
     */
    public function lotStatuses()
    {
        return $this->hasMany('App\LotStatus');
    }
}
