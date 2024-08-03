<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'title',
        'slug',
        'body',
        'date',
        'views',
        'language',
        'status',
        'category_id',
        'is_featured',
        'is_choice',
        'user_id',
    ];

    /**
     * Get the user that owns the Post
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Get all of the post comments for the Post
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function postComments(): HasMany
    {
        return $this->hasMany(PostComment::class, 'post_id', 'id');
    }

    /**
     * Get the post_category that owns the Post
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function postCategory(): BelongsTo
    {
        return $this->belongsTo(PostCategory::class, 'category_id', 'id');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

