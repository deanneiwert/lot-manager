<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lot extends Model
{
     /**
     * Get the community record associated with the lot.
     */
    public function community()
    {
        return $this->belongsTo('App\Community');
    }

     /**
     * Get the lot status record associated with the lot.
     */
    public function lotStatus()
    {
        return $this->belongsTo('App\LotStatus');
    }


}
