<?php

namespace App\Models\Module\Invoice;

use App\Models\Module\Invoice\Invoice;
use App\Models\Module\Product\Product;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\Module\Invoice\InvoiceEntry
 *
 * @property int $id
 * @property int $invoice_id
 * @property int $product_id
 * @property int|null $brand_id
 * @property string|null $itemCode
 * @property mixed|null $product_price
 * @property mixed|null $discount_amount
 * @property int|null $quantity
 * @property mixed|null $amount
 * @property int|null $itemQtyReceived
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $temp_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read mixed $discount
 * @property-read mixed $total_withoud_discount
 * @property-read Invoice $invoice
 * @property-read Product $product
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry productGroup($group, $condition = 'in')
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry query()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereBrandId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereDiscountAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereItemCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereItemQtyReceived($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereProductPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereTempId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceEntry whereUpdatedAt($value)
 * @mixin \Eloquent
 * @method static Builder|InvoiceEntry ofProduct($product)
 */
class InvoiceEntry extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable, HasFactory;

    protected $guarded = [];

    protected $casts = [
    	'product_price' => 'double:10,2',
    	'discount_amount' => 'double:10,2',
    	'amount' => 'double:10,2'
    ];

    public function getDiscountAttribute()
    {
    	return round($this->discount_amount / $this->quantity);
    }

    public function getTotalWithoudDiscountAttribute()
    {
    	return $this->product_price * $this->quantity;
    }

    public function product()
    {
    	return $this->belongsTo('App\Models\Module\Product\Product');
    }
    
    public function invoice()
    {
    	return $this->belongsTo(Invoice::class);
    }

    public function scopeProductGroup($builder, $group, $condition = 'in')
    {
        $products = Product::where('product_group', $group)->pluck('id');
        if($condition == 'not') {
            return $builder->whereNotIn('product_id', $products);
        } else {
            return $builder->whereIn('product_id', $products);
        }
    }


    public function scopeOfProduct(Builder $query, $product) : Builder
    {
        if(is_array($product)) {
            return $query->whereIn('product_id', $product);
        }

        return $query->where('product_id', $product);
    }
}
