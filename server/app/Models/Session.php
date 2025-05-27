<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Session extends Model
{
    protected $fillable = [
        'offer_id',
        'inquiry_id',
        'proposed_by',
        'accepted_by',
        'status',
        'selected_timeslot_id',
        'successfully_completed',
        'comment'];

    public function offer() : BelongsTo {
        return $this->belongsTo(Offer::class);
    }

    public function inquiry() : BelongsTo {
        return $this->belongsTo(Inquiry::class);
    }

    public function proposingUser() : BelongsTo {
        return $this->belongsTo(User::class, 'proposed_by');
    }

    public function acceptingUser() : BelongsTo {
        return $this->belongsTo(User::class, 'accepted_by');
    }

    public function timeslots() : HasMany {
        return $this->hasMany(Timeslot::class);
    }

    public function selectedTimeslot() : BelongsTo {
        return $this->belongsTo(Timeslot::class, 'selected_timeslot_id');
    }

}
