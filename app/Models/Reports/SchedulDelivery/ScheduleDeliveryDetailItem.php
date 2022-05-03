<?php

namespace App\Models\Reports\SchedulDelivery;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use App\Models\Module\Product\Product;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\Reports\SchedulDelivery\ScheduleDeliveryDetailItem
 *
 * @property int $id
 * @property int|null $schd_detail_id
 * @property int|null $product_id
 * @property float|null $bottle_rate
 * @property int|null $bottle_qty
 * @property int|null $actual_bottle_qty
 * @property int|null $returned_bottle_qty
 * @property int|null $modified_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read \App\Models\Reports\SchedulDelivery\ScheduleDeliveryDetail|null $detail
 * @property-read User|null $modifiedBy
 * @property-read Product|null $product
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem newQuery()
 * @method static \Illuminate\Database\Query\Builder|ScheduleDeliveryDetailItem onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem productGroup($group, $condition = 'in')
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereActualBottleQty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereBottleQty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereBottleRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereReturnedBottleQty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereSchdDetailId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ScheduleDeliveryDetailItem whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|ScheduleDeliveryDetailItem withTrashed()
 * @method static \Illuminate\Database\Query\Builder|ScheduleDeliveryDetailItem withoutTrashed()
 * @mixin \Eloquent
 */
class ScheduleDeliveryDetailItem extends Model implements Auditable
{
    use HasFactory, SoftDeletes, \OwenIt\Auditing\Auditable;

    protected $guarded = [];

    public function detail()
    {
        return $this->belongsTo(ScheduleDeliveryDetail::class, 'schd_detail_id', 'id');
    }
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    
    public function modifiedBy()
    {
        return $this->belongsTo(User::class, 'modified_by', 'id');
    }
    
    public function scopeProductGroup($builder, $group, $condition = 'in')
    {
        // $products = Cache::remember('app_products', now()->addHours(2), function() use ($group) {
        //     return Product::where('product_group', $group)->pluck('id');
        // });

        $products = ['8'];
        
        if ($condition == 'not') {
            return $builder->whereNotIn('product_id', $products);
        } else {
            return $builder->whereIn('product_id', $products);
        }
    }
}
