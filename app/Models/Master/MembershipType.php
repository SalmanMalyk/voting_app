<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Master\MembershipType
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $membership_code
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipType query()
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipType whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipType whereMembershipCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class MembershipType extends Model
{
    use HasFactory;
    protected $guarded = [];
}
