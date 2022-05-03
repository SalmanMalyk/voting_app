<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AuthenticationLog
 *
 * @property int $id
 * @property string $authenticatable_type
 * @property int $authenticatable_id
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property string|null $login_at
 * @property string|null $logout_at
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|AuthenticationLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AuthenticationLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AuthenticationLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|AuthenticationLog whereAuthenticatableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuthenticationLog whereAuthenticatableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuthenticationLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuthenticationLog whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuthenticationLog whereLoginAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuthenticationLog whereLogoutAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuthenticationLog whereUserAgent($value)
 * @mixin \Eloquent
 */
class AuthenticationLog extends Model
{
    use HasFactory;

   	protected $table = 'authentication_log';

    public function user()
    {
        return $this->belongsTo(User::class, 'authenticatable_id', 'id');
    }
}
