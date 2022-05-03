<?php

namespace App\Models\Module\Invoice;

use App\Models\Module\Customer\CustomerBranch;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Module\Invoice\OfferEarnedBottle
 *
 * @property int $id
 * @property int|null $customer_branch_id
 * @property int|null $invoice_id
 * @property string $type
 * @property int $quantity
 * @property int|null $user_id
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read CustomerBranch|null $customerBranch
 * @property-read \App\Models\Module\Invoice\Invoice|null $invoice
 * @property-read User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle customerBranch($branch)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle query()
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle type($type)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle whereCustomerBranchId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferEarnedBottle whereUserId($value)
 * @mixin \Eloquent
 */
class OfferEarnedBottle extends Model
{
    use HasFactory;

    protected $guarded = [];


    public function customerBranch()
    {
        return $this->belongsTo(CustomerBranch::class);
    }
    
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }
    
    public function scopeCustomerBranch($query, $branch)
    {
        return $query->where('customer_branch_id', $branch);
    }

    // HELPER METHODS

    /**
     * get sum of quantity of specific type
     * 
     * @param $type string type of quantity
     * @return int sum of quantity
     */
    public function typeSum($type = 'credit') : int
    {
        return $this->where('type', $type)->sum('quantity');
    }
}
