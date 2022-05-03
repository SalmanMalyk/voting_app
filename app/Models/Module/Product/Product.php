<?php

namespace App\Models\Module\Product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Module\Product\Product
 *
 * @property int $id
 * @property string $bottle_id
 * @property string|null $name
 * @property int|null $category_id
 * @property int|null $attached_product_id
 * @property int|null $product_group
 * @property float|null $stock
 * @property float|null $average_cost
 * @property float|null $price
 * @property float|null $price_corporate
 * @property float|null $price_home
 * @property float|null $price_retailer
 * @property float|null $opening_balance
 * @property string|null $product_image
 * @property int|null $status
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Module\Customer\CustomerDiscount[] $customerDiscount
 * @property-read int|null $customer_discount_count
 * @property-read \App\Models\Module\Product\ProductDiscount|null $discount
 * @method static Builder|Product active($status = true)
 * @method static Builder|Product newModelQuery()
 * @method static Builder|Product newQuery()
 * @method static \Illuminate\Database\Query\Builder|Product onlyTrashed()
 * @method static Builder|Product query()
 * @method static Builder|Product whereAttachedProductId($value)
 * @method static Builder|Product whereAverageCost($value)
 * @method static Builder|Product whereBottleId($value)
 * @method static Builder|Product whereCategoryId($value)
 * @method static Builder|Product whereCreatedAt($value)
 * @method static Builder|Product whereDeletedAt($value)
 * @method static Builder|Product whereId($value)
 * @method static Builder|Product whereName($value)
 * @method static Builder|Product whereOpeningBalance($value)
 * @method static Builder|Product wherePrice($value)
 * @method static Builder|Product wherePriceCorporate($value)
 * @method static Builder|Product wherePriceHome($value)
 * @method static Builder|Product wherePriceRetailer($value)
 * @method static Builder|Product whereProductGroup($value)
 * @method static Builder|Product whereProductImage($value)
 * @method static Builder|Product whereStatus($value)
 * @method static Builder|Product whereStock($value)
 * @method static Builder|Product whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Product withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Product withoutTrashed()
 * @mixin \Eloquent
 */
class Product extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $guarded = [];

    public function discount()
    {
    	return $this->hasOne('App\Models\Module\Product\ProductDiscount');
    }

    public function customerDiscount()
    {
    	return $this->hasMany('App\Models\Module\Customer\CustomerDiscount');
    }


    public function scopeActive(Builder $builder, $status = true)
    {
        return $builder->where('status', $status);
    }

}
