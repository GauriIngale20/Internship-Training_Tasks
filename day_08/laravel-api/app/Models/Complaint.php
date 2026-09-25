<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    public $timestamps = false;

    protected $table = 'complaints';

    protected $fillable = [
        'facility_id',
        'user_id',
        'complaint_text',
        'status',
        'complaint_date',
    ];

    public function facility()
    {
        return $this->belongsTo(Facility::class);
    }
}