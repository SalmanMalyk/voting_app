<?php

namespace App\Models\Master;

use App\Models\Reports\SchedulDelivery\ScheduleDelivery;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Master\Vehicle
 *
 * @property int $id
 * @property string|null $manufacturer
 * @property string|null $model
 * @property string|null $production_year
 * @property string|null $color
 * @property string|null $engine_capacity
 * @property int|null $fuel_type
 * @property string|null $engine_no
 * @property string|null $chasis_no
 * @property string|null $purchase_date
 * @property string|null $vehicle_owner
 * @property float|null $purchase_price
 * @property string|null $registration_date
 * @property string|null $plate_no
 * @property int|null $capacity
 * @property int|null $max_capacity
 * @property int|null $vehicle_type
 * @property string|null $attachments
 * @property string|null $tokens
 * @property string|null $images
 * @property int|null $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $vehicle_last_reading
 * @property-read mixed $vehicle_name
 * @property-read \Illuminate\Database\Eloquent\Collection|ScheduleDelivery[] $schedules
 * @property-read int|null $schedules_count
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle query()
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereAttachments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereChasisNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereEngineCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereEngineNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereFuelType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereManufacturer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereMaxCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereModel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle wherePlateNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereProductionYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle wherePurchaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle wherePurchasePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereRegistrationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereTokens($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereVehicleOwner($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereVehicleType($value)
 * @mixin \Eloquent
 * @property string|null $description
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereDescription($value)
 */
class Vehicle extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function schedules()
    {
        return $this->hasMany(ScheduleDelivery::class, 'vehicle_id', 'id');
    }


    public function getVehicleNameAttribute()
    {
        return "{$this->manufacturer} ({$this->plate_no})";
    }


    public function getVehicleLastReadingAttribute()
    {
        $last_schedule = $this->schedules()->status([7])->orderBy('completed_date', 'desc')->first('meter_reading_end');
        return $last_schedule->meter_reading_end ?? 0;
    }
}
