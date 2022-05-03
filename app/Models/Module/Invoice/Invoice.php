<?php

namespace App\Models\Module\Invoice;

use Bus;
use Notification;
use App\Enums\InvoiceType;
use App\Enums\InvoiceStatus;
use App\Models\General\Audit;
use App\Jobs\OfferEarnedBottlesJob;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Bus\Dispatcher;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Module\Invoice\InvoiceEntry;
use Illuminate\Database\Eloquent\SoftDeletes;
use Staudenmeir\EloquentEagerLimit\HasEagerLimit;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Notifications\Invoice\ShopInvoiceNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\Module\Invoice\Invoice
 *
 * @property int $id
 * @property int $customer_branch_id
 * @property int|null $schd_detail_id
 * @property int|null $old_customer_id
 * @property int|null $old_branch_id
 * @property string|null $membership_no
 * @property int|null $erie_branch_id
 * @property int|null $order_taken_by
 * @property int|null $invoice_type_id
 * @property int|null $customer_type_id
 * @property string|null $invoice_no
 * @property float|null $sum_invoice_amount
 * @property float|null $cash_received
 * @property float|null $change_return
 * @property float|null $sale_tax_percentage
 * @property int|null $payment_type_id
 * @property string|null $schedule_datetime
 * @property string|null $assignment_date
 * @property int|null $dispatcher
 * @property string|null $dispatch_date
 * @property string|null $delivery_date
 * @property int|null $bottle_returned
 * @property \Illuminate\Support\Carbon|null $order_date
 * @property int|null $status
 * @property int|null $mark_for_delete
 * @property string|null $reason
 * @property int|null $updated_by
 * @property int|null $deleted_by
 * @property int|null $delete_approved_by
 * @property string|null $delete_approved_date
 * @property string|null $delete_approved_reason
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $temp_id
 * @property-read \Illuminate\Database\Eloquent\Collection|Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read \App\Models\Master\Branch|null $branch
 * @property-read \App\Models\Module\Customer\CustomerBranch $customerBranch
 * @property-read \App\Models\Master\CustomerType|null $customerType
 * @property-read \App\Models\User|null $dispatcherUser
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Module\Invoice\InvoiceEntry[] $entries
 * @property-read int|null $entries_count
 * @property-read \App\Models\User|null $orderTakenBy
 * @property-read \App\Models\Module\Payment\Payment|null $payment
 * @method static Builder|Invoice newModelQuery()
 * @method static Builder|Invoice newQuery()
 * @method static \Illuminate\Database\Query\Builder|Invoice onlyTrashed()
 * @method static Builder|Invoice query()
 * @method static Builder|Invoice status($type)
 * @method static Builder|Invoice whereAssignmentDate($value)
 * @method static Builder|Invoice whereBottleReturned($value)
 * @method static Builder|Invoice whereCashReceived($value)
 * @method static Builder|Invoice whereChangeReturn($value)
 * @method static Builder|Invoice whereCreatedAt($value)
 * @method static Builder|Invoice whereCustomerBranchId($value)
 * @method static Builder|Invoice whereCustomerTypeId($value)
 * @method static Builder|Invoice whereDeleteApprovedBy($value)
 * @method static Builder|Invoice whereDeleteApprovedDate($value)
 * @method static Builder|Invoice whereDeleteApprovedReason($value)
 * @method static Builder|Invoice whereDeletedAt($value)
 * @method static Builder|Invoice whereDeletedBy($value)
 * @method static Builder|Invoice whereDeliveryDate($value)
 * @method static Builder|Invoice whereDispatchDate($value)
 * @method static Builder|Invoice whereDispatcher($value)
 * @method static Builder|Invoice whereErieBranchId($value)
 * @method static Builder|Invoice whereId($value)
 * @method static Builder|Invoice whereInvoiceNo($value)
 * @method static Builder|Invoice whereInvoiceTypeId($value)
 * @method static Builder|Invoice whereMarkForDelete($value)
 * @method static Builder|Invoice whereMembershipNo($value)
 * @method static Builder|Invoice whereOldBranchId($value)
 * @method static Builder|Invoice whereOldCustomerId($value)
 * @method static Builder|Invoice whereOrderDate($value)
 * @method static Builder|Invoice whereOrderTakenBy($value)
 * @method static Builder|Invoice wherePaymentTypeId($value)
 * @method static Builder|Invoice whereReason($value)
 * @method static Builder|Invoice whereSaleTaxPercentage($value)
 * @method static Builder|Invoice whereSchdDetailId($value)
 * @method static Builder|Invoice whereScheduleDatetime($value)
 * @method static Builder|Invoice whereStatus($value)
 * @method static Builder|Invoice whereSumInvoiceAmount($value)
 * @method static Builder|Invoice whereTempId($value)
 * @method static Builder|Invoice whereUpdatedAt($value)
 * @method static Builder|Invoice whereUpdatedBy($value)
 * @method static \Illuminate\Database\Query\Builder|Invoice withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Invoice withoutTrashed()
 * @mixin \Eloquent
 */
class Invoice extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable, HasFactory, SoftDeletes, HasEagerLimit;

    protected $guarded = [];

    protected $casts = [
        'order_date' => 'datetime'
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::created(function ($model) {
            // whenever a new invoice is created and it is, 
            // apply offer earned bottle job 
            if ($model->status == InvoiceStatus::Delivered) {
                OfferEarnedBottlesJob::dispatch($model);
            }
        });
        
        static::updating(function ($model) {
            // whenever a invoice is updated from dispatched to delivered, 
            // apply offer earned bottle job 
            if(($model->getOriginal('status') == InvoiceStatus::OutForDelivery) && ($model->status == InvoiceStatus::Delivered)) {
                OfferEarnedBottlesJob::dispatch($model);
            }
        });
    }

    public function entries()
    {
    	return $this->hasMany(InvoiceEntry::class, 'invoice_id', 'id');
    }

    public function payment()
    {
    	return $this->hasOne('App\Models\Module\Payment\Payment');
    }

    public function customerBranch()
    {
        return $this->belongsTo('App\Models\Module\Customer\CustomerBranch', 'customer_branch_id', 'id');
    }

    public function branch()
    {
        return $this->belongsTo('App\Models\Master\Branch', 'erie_branch_id', 'id');
    }

    public function customerType()
    {
        return $this->belongsTo('App\Models\Master\CustomerType', 'customer_type_id', 'id');
    }
    
    public function dispatcherUser()
    {
        return $this->belongsTo('App\Models\User', 'dispatcher', 'id');
    }
    
    public function orderTakenBy()
    {
        return $this->belongsTo('App\Models\User', 'order_taken_by', 'id');
    }


    public function scopeStatus(Builder $builder, $type = 2)
    {
        return $builder->where('status', $type);
    }


    public function audits(): MorphMany
    {
        return $this->morphMany(Audit::class, 'auditable');
    }


    // public function getArrearAttribute()
    // {
    //     $formatted_from_date = Carbon::now('PKT')->format('d-M-Y');
    //     $remaining = self::where('id', $this->id)->selectRaw("customer_receivable(?, ?) as remaining_balance", [$this->customer_branch_id, $formatted_from_date])->first();
    //     return ($remaining['remaining_balance'] - ($this->entries()->sum('amount') + ($this->cash_received - $this->change_return)));
    // }



    public function generateInvoiceCode()
    {
        $number = 0;
        $invoiceCount = Invoice::count();
        if (!$invoiceCount) {
            $number = 0;
        } else {
            $number = $invoiceCount;
        }

        $invoiceNo = date('y') . 'i' . sprintf('%05d', intval($number) + 1);
        return $invoiceNo;
    }
}
