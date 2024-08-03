<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Post;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;


// https://www.itsolutionstuff.com/post/laravel-11-rest-api-authentication-using-sanctum-tutorialexample.html

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'image',
        'name',
        'username',
        'email',
        'password',
        'birth_date',
        'role',
        'role_status',
        'status',
        'phone_number',
        'description',
        'social_link_facebook',
        'social_link_instagram',
        'social_link_linkedin',
        'social_link_youtube',
        'social_link_twitter',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get all of the posts for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'user_id', 'id');
    }

    /**
     * Get all of the user comments for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function userComments(): HasMany
    {
        return $this->hasMany(Comment::class, 'user_id', 'id');
    }

    /**
     * Get all of the fundraisings for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function fundraisings(): HasMany
    {
        return $this->hasMany(Fundraising::class, 'user_id', 'id');
    }

    /**
     * Get all of the banners for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function banners(): HasMany
    {
        return $this->hasMany(Banner::class, 'user_id', 'id');
    }

    /**
     * Get all of the donations for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class, 'user_id', 'id');
    }

    /**
     * Get all of the magazines for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function magazines(): HasMany
    {
        return $this->hasMany(Magazine::class, 'user_id', 'id');
    }

    public function getRouteKeyName(): string
    {
        return 'username';
    }
}
