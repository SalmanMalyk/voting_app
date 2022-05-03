<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use App\Models\Module\Customer\Customer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Module\Customer\CustomerBranch;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\Master\Town
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $full_name
 * @property int|null $zone_id
 * @property int|null $status
 * @property int|null $delivery_source
 * @property string|null $DeliverySchedule
 * @property string|null $driver_instructions
 * @property string|null $coordinate
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Master\Block[] $blocks
 * @property-read int|null $blocks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|CustomerBranch[] $customerBranches
 * @property-read int|null $customer_branches_count
 * @property-read mixed $town_days
 * @property-read \App\Models\Master\Zone|null $zone
 * @method static Builder|Town active($status = true)
 * @method static Builder|Town newModelQuery()
 * @method static Builder|Town newQuery()
 * @method static \Illuminate\Database\Query\Builder|Town onlyTrashed()
 * @method static Builder|Town query()
 * @method static Builder|Town whereCoordinate($value)
 * @method static Builder|Town whereCreatedAt($value)
 * @method static Builder|Town whereDeletedAt($value)
 * @method static Builder|Town whereDeliverySchedule($value)
 * @method static Builder|Town whereDeliverySource($value)
 * @method static Builder|Town whereDriverInstructions($value)
 * @method static Builder|Town whereFullName($value)
 * @method static Builder|Town whereId($value)
 * @method static Builder|Town whereName($value)
 * @method static Builder|Town whereStatus($value)
 * @method static Builder|Town whereUpdatedAt($value)
 * @method static Builder|Town whereZoneId($value)
 * @method static \Illuminate\Database\Query\Builder|Town withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Town withoutTrashed()
 * @mixin \Eloquent
 */
class Town extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected $appends = ['town_days'];

    public function customerBranches()
    {
        return $this->hasMany(CustomerBranch::class, 'town_id', 'id');
    }

    public function zone()
    {
        return $this->belongsTo('App\Models\Master\Zone');
    }
    
    public function blocks()
    {
        return $this->hasMany('App\Models\Master\Block', 'town_id', 'id');
    }

    public function getTownDaysAttribute()
    {
        $days = !empty($this->DeliverySchedule) ? collect(explode(',', $this->DeliverySchedule))->map(function ($item) {
            return array_flip(config('constants.week_days'))[$item] ?? null;
        }) : null;

        return $days;
    }


    public function scopeActive(Builder $builder, $status = true)
    {
        return $builder->where('status', $status);
    }

}
