<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Master\Zone
 *
 * @property int $id
 * @property string|null $name
 * @property int|null $saturday
 * @property int|null $sunday
 * @property int|null $monday
 * @property int|null $tuesday
 * @property int|null $wednesday
 * @property int|null $thursday
 * @property int|null $friday
 * @property int|null $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Master\Town[] $towns
 * @property-read int|null $towns_count
 * @method static Builder|Zone active($status = true)
 * @method static Builder|Zone newModelQuery()
 * @method static Builder|Zone newQuery()
 * @method static \Illuminate\Database\Query\Builder|Zone onlyTrashed()
 * @method static Builder|Zone query()
 * @method static Builder|Zone whereCreatedAt($value)
 * @method static Builder|Zone whereDeletedAt($value)
 * @method static Builder|Zone whereFriday($value)
 * @method static Builder|Zone whereId($value)
 * @method static Builder|Zone whereMonday($value)
 * @method static Builder|Zone whereName($value)
 * @method static Builder|Zone whereSaturday($value)
 * @method static Builder|Zone whereStatus($value)
 * @method static Builder|Zone whereSunday($value)
 * @method static Builder|Zone whereThursday($value)
 * @method static Builder|Zone whereTuesday($value)
 * @method static Builder|Zone whereUpdatedAt($value)
 * @method static Builder|Zone whereWednesday($value)
 * @method static \Illuminate\Database\Query\Builder|Zone withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Zone withoutTrashed()
 * @mixin \Eloquent
 */
class Zone extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $guarded = [];

    public function towns()
    {
        return $this->hasMany(Town::class);
    }

    public function scopeActive(Builder $query, $status = true)
    {
        return $query->where('status', $status);
    }

}
