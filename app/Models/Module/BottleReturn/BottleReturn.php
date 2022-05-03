<?php

namespace App\Models\Module\BottleReturn;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\Module\BottleReturn\BottleReturn
 *
 * @property int $id
 * @property int|null $customer_branch_id
 * @property string|null $net_payable
 * @property string|null $bottles
 * @property string|null $amount_returned
 * @property string|null $change_to_take
 * @property string|null $account_status_id
 * @property string|null $other_brand_bottles_id
 * @property string|null $remarks
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read \App\Models\Module\Customer\CustomerBranch|null $customerBranch
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Module\BottleReturn\BottleReturnEntry[] $entries
 * @property-read int|null $entries_count
 * @method static Builder|BottleReturn newModelQuery()
 * @method static Builder|BottleReturn newQuery()
 * @method static \Illuminate\Database\Query\Builder|BottleReturn onlyTrashed()
 * @method static Builder|BottleReturn query()
 * @method static Builder|BottleReturn whereAccountStatusId($value)
 * @method static Builder|BottleReturn whereAmountReturned($value)
 * @method static Builder|BottleReturn whereBottles($value)
 * @method static Builder|BottleReturn whereChangeToTake($value)
 * @method static Builder|BottleReturn whereCreatedAt($value)
 * @method static Builder|BottleReturn whereCustomerBranchId($value)
 * @method static Builder|BottleReturn whereId($value)
 * @method static Builder|BottleReturn whereNetPayable($value)
 * @method static Builder|BottleReturn whereOtherBrandBottlesId($value)
 * @method static Builder|BottleReturn whereRemarks($value)
 * @method static Builder|BottleReturn whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|BottleReturn withTrashed()
 * @method static \Illuminate\Database\Query\Builder|BottleReturn withoutTrashed()
 * @mixin \Eloquent
 */
class BottleReturn extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable, HasFactory, SoftDeletes;

    protected $guarded = [];


     public function entries()
    {
        return $this->hasMany('App\Models\Module\BottleReturn\BottleReturnEntry');
    }
        public function customerBranch()
    {
        return $this->belongsTo('App\Models\Module\Customer\CustomerBranch', 'customer_branch_id', 'id');
    }
}
