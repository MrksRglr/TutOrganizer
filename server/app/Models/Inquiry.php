<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Inquiry extends Model
{
    protected $fillable = ['user_id', 'offer_id', 'status'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function offer(): BelongsTo {
        return $this->belongsTo(Offer::class);
    }

    public function sessions(): HasMany {
        return $this->hasMany(Session::class);
    }

}
