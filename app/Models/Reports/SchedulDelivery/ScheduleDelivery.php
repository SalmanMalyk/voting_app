<?php

namespace App\Models\Reports\SchedulDelivery;

use App\Models\General\Attachment;
use App\Models\User;
use App\Models\Master\Vehicle;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\Reports\SchedulDelivery\ScheduleDelivery
 *
 * @property int $id
 * @property string|null $trip_no
 * @property int|null $delivery_source
 * @property string|null $delivery_schedule
 * @property int|null $vehicle_id
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property string|null $reason
 * @property int|null $dispatcher
 * @property array|null $helpers
 * @property string|null $meter_reading_start
 * @property string|null $meter_reading_end
 * @property \Illuminate\Support\Carbon|null $assignment_date
 * @property \Illuminate\Support\Carbon|null $approve_date
 * @property \Illuminate\Support\Carbon|null $dispatch_date
 * @property \Illuminate\Support\Carbon|null $completed_date
 * @property int|null $status
 * @property string|null $remarks
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $bottle_loaded
 * @property string|null $source_type
 * @property int|null $filled_bottle_returned
 * @property int|null $empty_bottle_returned
 * @property int|null $cash_deposited
 * @property \Illuminate\Support\Carbon|null $arrival_date
 * @property-read \Illuminate\Database\Eloquent\Collection|Attachment[] $attachments
 * @property-read int|null $attachments_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read User|null $createdBy
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Reports\SchedulDelivery\ScheduleDeliveryDetail[] $details
 * @property-read int|null $details_count
 * @property-read User|null $dispatcherUser
 * @property-read mixed $delivery_source_name
 * @property-read mixed $last_meter_reading
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Reports\SchedulDelivery\ScheduleDeliveryDetailItem[] $items
 * @property-read int|null $items_count
 * @property-read User|null $updatedBy
 * @property-read Vehicle|null $vehicle
 * @method static Builder|ScheduleDelivery newModelQuery()
 * @method static Builder|ScheduleDelivery newQuery()
 * @method static \Illuminate\Database\Query\Builder|ScheduleDelivery onlyTrashed()
 * @method static Builder|ScheduleDelivery query()
 * @method static Builder|ScheduleDelivery status($status = [])
 * @method static Builder|ScheduleDelivery whereApproveDate($value)
 * @method static Builder|ScheduleDelivery whereArrivalDate($value)
 * @method static Builder|ScheduleDelivery whereAssignmentDate($value)
 * @method static Builder|ScheduleDelivery whereBottleLoaded($value)
 * @method static Builder|ScheduleDelivery whereCashDeposited($value)
 * @method static Builder|ScheduleDelivery whereCompletedDate($value)
 * @method static Builder|ScheduleDelivery whereCreatedAt($value)
 * @method static Builder|ScheduleDelivery whereCreatedBy($value)
 * @method static Builder|ScheduleDelivery whereDeletedAt($value)
 * @method static Builder|ScheduleDelivery whereDeliverySchedule($value)
 * @method static Builder|ScheduleDelivery whereDeliverySource($value)
 * @method static Builder|ScheduleDelivery whereDispatchDate($value)
 * @method static Builder|ScheduleDelivery whereDispatcher($value)
 * @method static Builder|ScheduleDelivery whereEmptyBottleReturned($value)
 * @method static Builder|ScheduleDelivery whereFilledBottleReturned($value)
 * @method static Builder|ScheduleDelivery whereHelpers($value)
 * @method static Builder|ScheduleDelivery whereId($value)
 * @method static Builder|ScheduleDelivery whereMeterReadingEnd($value)
 * @method static Builder|ScheduleDelivery whereMeterReadingStart($value)
 * @method static Builder|ScheduleDelivery whereReason($value)
 * @method static Builder|ScheduleDelivery whereRemarks($value)
 * @method static Builder|ScheduleDelivery whereSourceType($value)
 * @method static Builder|ScheduleDelivery whereStatus($value)
 * @method static Builder|ScheduleDelivery whereTripNo($value)
 * @method static Builder|ScheduleDelivery whereUpdatedAt($value)
 * @method static Builder|ScheduleDelivery whereUpdatedBy($value)
 * @method static Builder|ScheduleDelivery whereVehicleId($value)
 * @method static \Illuminate\Database\Query\Builder|ScheduleDelivery withTrashed()
 * @method static \Illuminate\Database\Query\Builder|ScheduleDelivery withoutTrashed()
 * @mixin \Eloquent
 * @property-read mixed $planned_cash
 */
class ScheduleDelivery extends Model implements Auditable
{
    use HasFactory, SoftDeletes, \Staudenmeir\EloquentJsonRelations\HasJsonRelationships, \OwenIt\Auditing\Auditable;
    
    protected $guarded = [];

    protected $casts = [
        'helpers'         => 'array',
        'assignment_date' => 'datetime',
        'approve_date'    => 'datetime',
        'dispatch_date'   => 'datetime',
        'completed_date'   => 'datetime',
        'arrival_date'   => 'datetime',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }


    public function details()
    {
        return $this->hasMany(ScheduleDeliveryDetail::class, 'schedule_delivery_id', 'id');
    }


    public function items()
    {
        return $this->hasManyThrough(ScheduleDeliveryDetailItem::class, ScheduleDeliveryDetail::class, 'schedule_delivery_id', 'schd_detail_id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id', 'id');
    }

    public function dispatcherUser()
    {
        return $this->belongsTo(User::class, 'dispatcher', 'id');
    }
    
    public function helperUsers()
    {
        return $this->belongsToJson(User::class, 'helpers', 'id');
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }

    public function scopeStatus(Builder $builder, $status = [0]) : Builder
    {
        return $builder->whereIn('status', $status);
    } 


    public function getLastMeterReadingAttribute()
    {
        $meter_reading = self::where('vehicle_id', $this->vehicle_id)->whereNotIn('id', [$this->id])->status([7, 8])->orderBy('completed_date', 'desc')->first('meter_reading_end');
        return $meter_reading->meter_reading_end ?? 0;
    }


    public function getDeliverySourceNameAttribute()
    {
        return $this->delivery_source ? config('constants.delivery_sources')[$this->delivery_source] : null;
    }

    public function getPlannedCashAttribute()
    {
        return $this->items()->get()->reduce(function($carry, $item) {
            return $carry = $carry + ($item->bottle_qty * $item->bottle_rate);
        }, 0);
    }
    
    /**
     * Generate trip no according to date and vehicle
     * 
     * @param Date $date Date of schedule delivery
     * @param Vehicle $vehicle vehicle of schedule delivery
     * 
     * @return $code generated code (Trip-date-vehicle-no)
     * @author Salman
     */
    public function generateRouteCode($date, $vehicle)
    {
        $scheduleDate = Carbon::parse($date)->format('M-d');
        // get vehicle name
        $vehicle = Vehicle::find($vehicle);
        // $vehicleName = $vehicle->manufacturer . '-' . $vehicle->plate_no;
        // generate vehicle trip no
        $trip_no = self::where('delivery_schedule', $date)->where('vehicle_id', $vehicle->id)->count();
        $trip_no = sprintf('%02d', intval($trip_no) + 1);
        // combine code
        $code = "Trip-{$scheduleDate}-{$vehicle->id}-{$trip_no}";
        // return
        return $code;
    }
}
