<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'header',            
        'thumbnail',
        'content',
        'tags',
        'author',
        'date',
        'active',
    ];
}
