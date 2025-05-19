<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Session extends Model
{
    protected $fillable = [
        'offer',
        'proposed_by',
        'accepted_by',
        'status',
        'start_time',
        'end_time',
        'comment'];

    public function offer() : BelongsTo {
        return $this->belongsTo(Offer::class);
    }

    public function proposingUser() : BelongsTo {
        return $this->belongsTo(User::class, 'proposed_by');
    }

    public function acceptingUser() : BelongsTo {
        return $this->belongsTo(User::class, 'accepted_by');
    }
}
