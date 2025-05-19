<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Request extends Model
{
    protected $fillable = ['user', 'offer', 'status'];

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }
}
