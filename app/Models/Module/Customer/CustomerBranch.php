<?php

namespace App\Models\Module\Customer;

use Carbon\Carbon;
use App\Enums\MessageType;
use App\Enums\InvoiceStatus;
use App\Facade\Outreach\Outreach;
use Illuminate\Support\Facades\DB;
use App\Models\Module\Invoice\Invoice;
use App\Models\Module\Payment\Payment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Module\Invoice\InvoiceEntry;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Module\Invoice\OfferEarnedBottle;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Reports\SchedulDelivery\ScheduleDeliveryDetail;

/**
 * App\Models\Module\Customer\CustomerBranch
 *
 * @property int $id
 * @property int $customer_id
 * @property int|null $delivery_sort_order
 * @property int|null $old_customer_branch_id
 * @property int|null $town_id
 * @property string|null $town_name
 * @property int|null $block_id
 * @property string|null $branch_name
 * @property string|null $email
 * @property string|null $address
 * @property string|null $street
 * @property string|null $building
 * @property string|null $designation
 * @property string|null $city
 * @property string|null $phone_office
 * @property string|null $contact_person
 * @property string|null $contact_no
 * @property string|null $notes
 * @property int|null $status
 * @property float $sum_sale
 * @property float $sum_receipts
 * @property float $last_paid_amount
 * @property string|null $last_paid_date
 * @property int $schedule_delivery
 * @property int|null $payment_method_id customer payment mode
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $bottle_cap
 * @property string|null $longitude
 * @property string|null $latitude
 * @property int|null $delivery_source
 * @property string|null $delivery_schedule
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read \App\Models\Master\Block|null $block
 * @property-read \App\Models\Module\Customer\Customer $customer
 * @property-read \Illuminate\Database\Eloquent\Collection|InvoiceEntry[] $entries
 * @property-read int|null $entries_count
 * @property-read mixed $arrear
 * @property-read mixed $complete_name
 * @property-read mixed $customer_name
 * @property-read mixed $delivery_schedule_name
 * @property-read mixed $delivery_source_name
 * @property-read mixed $location
 * @property-read mixed $new_address
 * @property-read Int $receivable
 * @property-read mixed $short_address
 * @property-read \Illuminate\Database\Eloquent\Collection|Invoice[] $invoices
 * @property-read int|null $invoices_count
 * @property-read \Illuminate\Database\Eloquent\Collection|Payment[] $payments
 * @property-read int|null $payments_count
 * @property-read \App\Models\Master\Town|null $town
 * @method static Builder|CustomerBranch active($status = true)
 * @method static Builder|CustomerBranch matches($value)
 * @method static Builder|CustomerBranch newModelQuery()
 * @method static Builder|CustomerBranch newQuery()
 * @method static \Illuminate\Database\Query\Builder|CustomerBranch onlyTrashed()
 * @method static Builder|CustomerBranch query()
 * @method static Builder|CustomerBranch whereAddress($value)
 * @method static Builder|CustomerBranch whereBlockId($value)
 * @method static Builder|CustomerBranch whereBottleCap($value)
 * @method static Builder|CustomerBranch whereBranchName($value)
 * @method static Builder|CustomerBranch whereBuilding($value)
 * @method static Builder|CustomerBranch whereCity($value)
 * @method static Builder|CustomerBranch whereContactNo($value)
 * @method static Builder|CustomerBranch whereContactPerson($value)
 * @method static Builder|CustomerBranch whereCreatedAt($value)
 * @method static Builder|CustomerBranch whereCustomerId($value)
 * @method static Builder|CustomerBranch whereDeletedAt($value)
 * @method static Builder|CustomerBranch whereDeliverySchedule($value)
 * @method static Builder|CustomerBranch whereDeliverySortOrder($value)
 * @method static Builder|CustomerBranch whereDeliverySource($value)
 * @method static Builder|CustomerBranch whereDesignation($value)
 * @method static Builder|CustomerBranch whereEmail($value)
 * @method static Builder|CustomerBranch whereId($value)
 * @method static Builder|CustomerBranch whereLastPaidAmount($value)
 * @method static Builder|CustomerBranch whereLastPaidDate($value)
 * @method static Builder|CustomerBranch whereLatitude($value)
 * @method static Builder|CustomerBranch whereLongitude($value)
 * @method static Builder|CustomerBranch whereNotes($value)
 * @method static Builder|CustomerBranch whereOldCustomerBranchId($value)
 * @method static Builder|CustomerBranch wherePaymentMethodId($value)
 * @method static Builder|CustomerBranch wherePhoneOffice($value)
 * @method static Builder|CustomerBranch whereScheduleDelivery($value)
 * @method static Builder|CustomerBranch whereStatus($value)
 * @method static Builder|CustomerBranch whereStreet($value)
 * @method static Builder|CustomerBranch whereSumReceipts($value)
 * @method static Builder|CustomerBranch whereSumSale($value)
 * @method static Builder|CustomerBranch whereTownId($value)
 * @method static Builder|CustomerBranch whereTownName($value)
 * @method static Builder|CustomerBranch whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|CustomerBranch withTrashed()
 * @method static \Illuminate\Database\Query\Builder|CustomerBranch withoutTrashed()
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|OfferEarnedBottle[] $earnedBottles
 * @property-read int|null $earned_bottles_count
 * @property-read mixed $earned_bottle_count
 * @property-read mixed $last_delivered_bottle
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|ScheduleDeliveryDetail[] $scheduleDeliveryDetails
 * @property-read int|null $schedule_delivery_details_count
 */
class CustomerBranch extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable, SoftDeletes, \Staudenmeir\EloquentEagerLimit\HasEagerLimit, Notifiable;

    const controller = "App\Http\Controllers\Module\CustomerController";

    protected $guarded = [];

    protected $appends = ['customer_name', 'location', 'complete_name', 'new_address', 'short_address'];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::created(function ($model) {
            Outreach::sendNow($model, MessageType::Welcome());
        });
    }

    public function customer()
    {
    	return $this->belongsTo('App\Models\Module\Customer\Customer');
    }

    public function town()
    {
        return $this->belongsTo('App\Models\Master\Town');
    }
    
    public function block()
    {
        return $this->belongsTo('App\Models\Master\Block');
    }
    
    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function bottleReturn()
    {
        return $this->hasMany(BottleReturn::class);
    }

    // * use the hasmanythrough to 
    // * get invoice entries through invoice 
    public function entries()
    {
        return $this->hasManyThrough(InvoiceEntry::class, Invoice::class);
    }
    

    public function scheduleDeliveryDetails()
    {
        return $this->hasMany(ScheduleDeliveryDetail::class, 'customer_branch_id', 'id');
    }
    
    
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function earnedBottles() : HasMany
    {
        return $this->hasMany(OfferEarnedBottle::class, 'customer_branch_id', 'id');
    }
    
    // LOCAL SCOPES
    public function scopeActive(Builder $query, $status = true)
    {
        return $query->where('status', $status);
    }

    // MUTATORS 
    public function getCustomerNameAttribute()
    {
    	return ($this->customer->name ?? '') . ' — ' . $this->address;
    }
    
    public function getLocationAttribute()
    {
    	return ($this->branch_name ?? '') . ' — ' . $this->town_name;
    }
    
    public function getCompleteNameAttribute()
    {   
        if($this->customer->customer_type_id == 1){
    	    return ($this->customer->name ?? '') . ($this->customer->customerBranches()->count() > 2 ? ('('. $this->branch_name .')') : null);
        } else {
            return($this->contact_person ?? '');
        }
    }

    public function getArrearAttribute()
    {
        $formatted_from_date = Carbon::now('PKT')->format('d-M-Y');
        $remaining = collect(DB::select('SELECT customer_receivable(?,?) AS remaining_balance', [$this->id, $formatted_from_date]))->first()->remaining_balance;
        return $remaining;
    }

    public function getMembershipNoArrtibute()
    {
        return $this->customer->membership_no ?? 'N/A';
    }


    // LOCAL SCOPES
    public function scopeMatches(Builder $query, $value)
    {
    	return $query->where('customer_name', 'LIKE', "%$value%");
    }

    public function getNewAddressAttribute()
    {
        return $this->address . ($this->block ? '-' . $this->block->name : null) . ($this->building ? ', '.$this->building : null) . ($this->street ? ', '.$this->street : null);
    }
    
    public function getShortAddressAttribute()
    {
        return $this->address . ($this->building ? ', '.$this->building : null) . ($this->street ? ', '.$this->street : null);
    }

    public function getDeliverySourceNameAttribute()
    {
        $delivery_source = !empty($this->delivery_source) 
                                ? $this->delivery_source 
                                : (!empty($this->block->delivery_source ?? null) 
                                    ? $this->block->delivery_source 
                                    : (!empty($this->town->delivery_source) ? $this->town->delivery_source : null));
        return $delivery_source ? config('constants.delivery_sources')[$delivery_source] : null;
    }

    public function getDeliveryScheduleNameAttribute()
    {
        $delivery_schedule = !empty($this->delivery_schedule)
                                ? $this->delivery_schedule
                                : (!empty($this->block->delivery_schedule ?? null)
                                    ? $this->block->delivery_schedule
                                    : (!empty($this->town->DeliverySchedule ?? null) ? $this->town->DeliverySchedule : null));
        return $delivery_schedule;
    }


    /**
     * Total Receivable from customer branches table
     * 
     * @param CustomerBranch Int sum_sale 
     * @param CustomerBranch Int sum_receipts 
     * 
     * @return Int total receivable
     */
    public function getReceivableAttribute() : Int
    {
        return $this->sum_sale - $this->sum_receipts;
    }


    public function getEarnedBottleCountAttribute()
    {
        return (int) $this->earnedBottles()->type('credit')->sum('quantity') - $this->earnedBottles()->type('debit')->sum('quantity');
    }


    public function getLastDeliveredBottleAttribute()
    {
        $latestInvoice = $this->invoices()->status(InvoiceStatus::Delivered())->latest()->first();

        if ($latestInvoice) {
            $bottleQuantity = $latestInvoice->entries()->whereIn('product_id', [7,8,11])->sum('quantity');
            return $bottleQuantity;
        }
    }
}
