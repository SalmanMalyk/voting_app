<?php

namespace App\Models\Module\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Module\Product\ProductDiscount
 *
 * @property int $id
 * @property int $product_id
 * @property float|null $price_discount
 * @property string|null $date_from
 * @property string|null $date_to
 * @property string|null $deleted_at
 * @property int|null $deleted_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property int|null $created_by
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $updated_by
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount whereDateFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount whereDateTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount whereDeletedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount wherePriceDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductDiscount whereUpdatedBy($value)
 * @mixin \Eloquent
 */
class ProductDiscount extends Model
{
    use HasFactory;
     protected $guarded = [];
}
