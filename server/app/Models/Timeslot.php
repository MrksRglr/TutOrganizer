<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Timeslot extends Model
{
    protected $fillable = ['session_id', 'start_time', 'end_time'];

    public function session() : BelongsTo {
        return $this->belongsTo(Session::class);
    }
}
