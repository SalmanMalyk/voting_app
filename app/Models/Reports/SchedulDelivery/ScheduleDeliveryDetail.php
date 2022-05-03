<?php

namespace App\Models\Reports\SchedulDelivery;

use App\Enums\CustomerScheduleStatus;
use App\Models\General\AppSetting;
use App\Models\User;
use App\Models\Module\Invoice\Invoice;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Module\Customer\CustomerBranch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Reports\SchedulDelivery\ScheduleDeliveryDetailItem;

/**
 * App\Models\Reports\SchedulDelivery\ScheduleDeliveryDetail
 *
 * @property int $id
 * @property int|null $order_no
 * @property int|null $schedule_delivery_id
 * @property int|null $customer_branch_id
 * @property string|null $schedule_time
 * @property string|null $special_instructions
 * @property int|null $cash_received
 * @property int|null $status
 * @property int|null $modified_by
 * @property string|null $reached_at
 * @property string|null $left_at
 * @property array|null $misc
 * @property string|null $remarks
 * @property string|null $reason
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $invoice_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read CustomerBranch|null $customerBranch
 * @property-read Invoice|null $invoice
 * @property-read \Illuminate\Database\Eloquent\Collection|ScheduleDeliveryDetailItem[] $items
 * @property-read int|null $items_count
 * @property-read User|null $modifiedBy
 * @property-read \App\Models\Reports\SchedulDelivery\ScheduleDelivery|null $scheduleDelivery
 * @method static Builder|ScheduleDeliveryDetail check(array $status, string $type = 'in')
 * @method static Builder|ScheduleDeliveryDetail newModelQuery()
 * @method static Builder|ScheduleDeliveryDetail newQuery()
 * @method static \Illuminate\Database\Query\Builder|ScheduleDeliveryDetail onlyTrashed()
 * @method static Builder|ScheduleDeliveryDetail query()
 * @method static Builder|ScheduleDeliveryDetail whereCashReceived($value)
 * @method static Builder|ScheduleDeliveryDetail whereCreatedAt($value)
 * @method static Builder|ScheduleDeliveryDetail whereCustomerBranchId($value)
 * @method static Builder|ScheduleDeliveryDetail whereDeletedAt($value)
 * @method static Builder|ScheduleDeliveryDetail whereId($value)
 * @method static Builder|ScheduleDeliveryDetail whereInvoiceId($value)
 * @method static Builder|ScheduleDeliveryDetail whereLeftAt($value)
 * @method static Builder|ScheduleDeliveryDetail whereMisc($value)
 * @method static Builder|ScheduleDeliveryDetail whereModifiedBy($value)
 * @method static Builder|ScheduleDeliveryDetail whereOrderNo($value)
 * @method static Builder|ScheduleDeliveryDetail whereReachedAt($value)
 * @method static Builder|ScheduleDeliveryDetail whereReason($value)
 * @method static Builder|ScheduleDeliveryDetail whereRemarks($value)
 * @method static Builder|ScheduleDeliveryDetail whereScheduleDeliveryId($value)
 * @method static Builder|ScheduleDeliveryDetail whereScheduleTime($value)
 * @method static Builder|ScheduleDeliveryDetail whereSpecialInstructions($value)
 * @method static Builder|ScheduleDeliveryDetail whereStatus($value)
 * @method static Builder|ScheduleDeliveryDetail whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|ScheduleDeliveryDetail withTrashed()
 * @method static \Illuminate\Database\Query\Builder|ScheduleDeliveryDetail withoutTrashed()
 * @mixin \Eloquent
 * @property string|null $latitude
 * @property string|null $longitude
 * @property-read mixed $reason_text
 * @property-read int $voucher_bottles
 * @method static Builder|ScheduleDeliveryDetail isWithinMaxDistance($radius = '0.05')
 * @method static Builder|ScheduleDeliveryDetail whereLatitude($value)
 * @method static Builder|ScheduleDeliveryDetail whereLongitude($value)
 */
class ScheduleDeliveryDetail extends Model implements Auditable
{
    use HasFactory, SoftDeletes, \OwenIt\Auditing\Auditable;

    protected $guarded = [];

    protected $casts = [
        'misc' => 'array'
    ];

    public function scheduleDelivery()
    {
        return $this->belongsTo(ScheduleDelivery::class);
    }
    
    public function customerBranch()
    {
        return $this->belongsTo(CustomerBranch::class, 'customer_branch_id', 'id');
    }

    public function items()
    {
        return $this->hasMany(ScheduleDeliveryDetailItem::class, 'schd_detail_id', 'id');
    }

    public function modifiedBy()
    {
        return $this->belongsTo(User::class, 'modified_by', 'id');
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class, 'schd_detail_id', 'id');
    }

    public function getReasonTextAttribute()
    {
        $reasons = AppSetting::values('OrderUndeliveredReasons');
        return isset($reasons[$this->reason]) ? $reasons[$this->reason] : null;
    }

    /**
     * checks wether row contains/not contains specific statuses
     * 
     * @param Builder $query
     * @param Array $status array of statuses. Reference: CustomerScheduleStatus::class
     * @param String $type Example: in or not
     * 
     * @return bool
     */
    public function scopeCheck(Builder $query, array $status, string $type = "in") : bool
    {
        if($type == 'in') {
            return $query->whereIn('status', $status)->count() > 0;
        } else if ($type == 'not') {
            return $query->whereNotIn('status', $status)->count() > 0;
        }
    }


    public function getVoucherBottlesAttribute() : int
    {
        $vouchers = $this->customerBranch->earnedBottles;
        $credit = $vouchers->where('type', 'credit')->sum('quantity');
        $debit = $vouchers->where('type', 'debit')->sum('quantity');
        return $credit - $debit;
    }

    public function scopeIsWithinMaxDistance($query, $radius = 0.05)
    {
        $haversine = "(6371 * acos(cos(radians(customer_branches.latitude)) 
                     * cos(radians(schedule_delivery_details.latitude)) 
                     * cos(radians(schedule_delivery_details.longitude) 
                     - radians(customer_branches.longitude)) 
                     + sin(radians(customer_branches.latitude)) 
                     * sin(radians(schedule_delivery_details.latitude))))";
        return $query
                ->select([
                    'customer_branches.latitude as customer_latitude', 
                    'customer_branches.longitude as customer_longitude', 
                    'schedule_delivery_details.latitude as delivery_latitude',
                    'schedule_delivery_details.longitude as delivery_longitude',
                    'schedule_delivery_details.customer_branch_id',
                    'schedule_delivery_details.id'
                ])
                ->leftJoin('customer_branches', 'customer_branches.id', '=', 'schedule_delivery_details.customer_branch_id')
                ->selectRaw("ROUND({$haversine}, 1) AS distance")
                ->whereRaw("{$haversine} > ?", [$radius]);
    }
}
