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
}
