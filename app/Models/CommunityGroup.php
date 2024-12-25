<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityGroup extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'type',
        'link',
        'description',
        'is_active'
    ];
}
