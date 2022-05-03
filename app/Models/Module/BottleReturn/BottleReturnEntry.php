<?php

namespace App\Models\Module\BottleReturn;

use App\Models\Module\BottleReturn\BottleReturn;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\Module\BottleReturn\BottleReturnEntry
 *
 * @property int $id
 * @property int $bottle_return_id
 * @property int|null $invoice_entry_id
 * @property int|null $product_id
 * @property float|null $rate
 * @property mixed|null $quantity
 * @property mixed|null $amount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property mixed $product_price
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read BottleReturn $bottleReturn
 * @property-read \App\Models\Module\Product\Product|null $product
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry query()
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry whereBottleReturnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry whereInvoiceEntryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry whereRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BottleReturnEntry whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BottleReturnEntry extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable, HasFactory;

    protected $guarded = [];


    protected $casts = [
        'product_price' => 'double:10,2',
        'quantity'=>'double:10,2',
        'amount' => 'double:10,2'
    ];
    public function bottleReturn()
    {
        return $this->belongsTo(BottleReturn::class);
    }
    public function product()
    {
        return $this->belongsTo('App\Models\Module\Product\Product');
    }

}
