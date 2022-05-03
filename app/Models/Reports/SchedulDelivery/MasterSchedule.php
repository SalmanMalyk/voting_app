<?php

namespace App\Models\Reports\SchedulDelivery;

use App\Models\Module\Customer\CustomerBranch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Reports\SchedulDelivery\MasterSchedule
 *
 * @property int $id
 * @property int|null $sort_order
 * @property int|null $delivery_source
 * @property string|null $delivery_schedule
 * @property int|null $customer_branch_id
 * @property int|null $scheduled_delivery
 * @property int|null $status
 * @property int|null $schedule_status
 * @property int|null $created_by
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read CustomerBranch|null $customerBranch
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule query()
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereCustomerBranchId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereDeliverySchedule($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereDeliverySource($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereScheduleStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereScheduledDelivery($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterSchedule whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class MasterSchedule extends Model
{
    use HasFactory;

    protected $table = 'master_schedule_delivery';

    protected $guarded = [];

    public function customerBranch()
    {
        return $this->belongsTo(CustomerBranch::class);
    }
}
