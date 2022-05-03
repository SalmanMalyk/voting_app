<?php

namespace App\Models\Master;

use App\Traits\Workflow;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Module\Customer\CustomerBranch;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\Master\Block
 *
 * @property int $id
 * @property int|null $zone_id
 * @property int|null $town_id
 * @property string|null $name
 * @property int|null $on_call_delivery
 * @property int|null $status
 * @property int|null $delivery_source
 * @property string|null $delivery_schedule
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|CustomerBranch[] $customerBranches
 * @property-read int|null $customer_branches_count
 * @property-read mixed $block_days
 * @property-read bool $has_workflow
 * @property-read bool $in_progress
 * @property-read array $workflow
 * @property-read \App\Models\Master\Town|null $town
 * @property-read \App\Models\Master\Zone|null $zone
 * @method static Builder|Block active($status = true)
 * @method static Builder|Block newModelQuery()
 * @method static Builder|Block newQuery()
 * @method static \Illuminate\Database\Query\Builder|Block onlyTrashed()
 * @method static Builder|Block query()
 * @method static Builder|Block whereCreatedAt($value)
 * @method static Builder|Block whereDeletedAt($value)
 * @method static Builder|Block whereDeliverySchedule($value)
 * @method static Builder|Block whereDeliverySource($value)
 * @method static Builder|Block whereId($value)
 * @method static Builder|Block whereName($value)
 * @method static Builder|Block whereOnCallDelivery($value)
 * @method static Builder|Block whereStatus($value)
 * @method static Builder|Block whereTownId($value)
 * @method static Builder|Block whereUpdatedAt($value)
 * @method static Builder|Block whereZoneId($value)
 * @method static \Illuminate\Database\Query\Builder|Block withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Block withoutTrashed()
 * @mixin \Eloquent
 */
class Block extends Model
{
    use HasFactory, SoftDeletes, Workflow;

    const controller = "App\Http\Controllers\Master\BlockController";

    protected $guarded = [];

    protected $appends = ['block_days'];

    public function zone()
    {
        return $this->belongsTo('App\Models\Master\Zone');
    }
    
    public function town()
    {  
        return $this->belongsTo(Town::class);
    }

    public function customerBranches()
    {
        return $this->hasMany(CustomerBranch::class, 'block_id', 'id');
    }

    public function scopeActive(Builder $builder, $status = true)
    {
        return $builder->where('status', $status);
    }

    public function getBlockDaysAttribute()
    {
        $days = !empty($this->delivery_schedule) ? collect(explode(',', str_replace(' ', '', $this->delivery_schedule)))->map(function ($item) {
            return array_flip(config('constants.week_days'))[$item] ?? null;
        }) : null;

        return $days;
    }

}
