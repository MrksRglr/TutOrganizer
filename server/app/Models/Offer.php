<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offer extends Model
{
    protected $fillable = ['course_id', 'user_id', 'description'];

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function course() : BelongsTo {
        return $this->belongsTo(Course::class);
    }

    public function inquiries() : HasMany {
        return $this->hasMany(Inquiry::class);
    }

}
