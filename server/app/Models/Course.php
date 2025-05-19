<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    protected $fillable = ['name', 'code', 'description'];

    public function offers() : HasMany {
        return $this->hasMany(Offer::class);
    }
}
