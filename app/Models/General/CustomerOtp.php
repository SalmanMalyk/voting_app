<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\General\CustomerOtp
 *
 * @property int $id
 * @property int|null $customer_id
 * @property string|null $otp
 * @property string|null $expire_at
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerOtp newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerOtp newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerOtp query()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerOtp whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerOtp whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerOtp whereExpireAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerOtp whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerOtp whereOtp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerOtp whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerOtp whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class CustomerOtp extends Model
{
    use HasFactory;

    protected $guarded = [];
}
