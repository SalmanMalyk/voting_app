<?php

namespace App\Models\Module\Customer;

use App\Models\Module\Customer\Customer;
use App\Models\Module\Invoice\Invoice;
use App\Models\Module\Product\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

/**
 * App\Models\Module\Customer\CustomerDiscount
 *
 * @property int $id
 * @property int $customer_id
 * @property int $product_id
 * @property float|null $price_discount
 * @property int|null $invoice_type_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read Customer $customer
 * @property-read Product $product
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount newQuery()
 * @method static \Illuminate\Database\Query\Builder|CustomerDiscount onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount query()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount whereInvoiceTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount wherePriceDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerDiscount whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|CustomerDiscount withTrashed()
 * @method static \Illuminate\Database\Query\Builder|CustomerDiscount withoutTrashed()
 * @mixin \Eloquent
 */
class CustomerDiscount extends Model implements Auditable
{
    use HasFactory, SoftDeletes, \OwenIt\Auditing\Auditable;

    const controller = 'App\Http\Controllers\Master\Discount\CustomerDiscountController';

    protected $guarded = [];

    public function customer()
    {
    	return $this->belongsTo(Customer::class);
    }

    public function product()
    {
    	return $this->belongsTo(Product::class);
    }

}
