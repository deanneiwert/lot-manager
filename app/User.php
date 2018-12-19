<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * required by JWTSubject interface
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * required by JWTSubject interface
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get the role record associated with the user.
     */
    public function role()
    {
        return $this->belongsTo('App\Role');
    }

    /**
     * Get the builder record associated with the user.
     */
    public function builder()
    {
        return $this->belongsTo('App\Builder');
    }

    /**
     * get the assignments associated with this user
     */
    public function communityAssignment()
    {
        return $this->hasMany('App\CommunityAssignment');
    }
}
