<?php

namespace App\Models\Module\Customer;

use App\Facade\Outreach\Outreach;
use Laravel\Sanctum\HasApiTokens;
use App\Models\General\CustomerOtp;
use App\Models\Module\Product\Product;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Module\Customer\CustomerBranch;
use App\Models\Module\Customer\CustomerDiscount;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * App\Models\Module\Customer\Customer
 *
 * @property int $id
 * @property int $customer_type_id
 * @property int $membership_type_id
 * @property string|null $membership_no
 * @property string|null $name
 * @property string|null $address
 * @property string|null $town_name
 * @property int|null $block_id
 * @property int|null $town_id
 * @property string|null $city
 * @property string|null $phone_office
 * @property string|null $contact_person
 * @property string|null $contact_no
 * @property string|null $cell_phone
 * @property string|null $designation
 * @property string|null $work_email_address
 * @property string|null $customer_type
 * @property string|null $primary_referrer
 * @property string|null $secondary_referrer
 * @property string|null $opening_receivable
 * @property string|null $remarks
 * @property string|null $close_reason
 * @property string|null $date_closed
 * @property int|null $special_customer
 * @property int|null $status
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property int|null $deleted_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read \Illuminate\Database\Eloquent\Collection|CustomerBranch[] $customerBranches
 * @property-read int|null $customer_branches_count
 * @property-read \Illuminate\Database\Eloquent\Collection|CustomerDiscount[] $customerDiscounts
 * @property-read int|null $customer_discounts_count
 * @property-read \App\Models\Master\CustomerType $customerType
 * @property-read \App\Models\Master\MembershipType|null $membershipType
 * @property-read \Illuminate\Database\Eloquent\Collection|CustomerOtp[] $otp
 * @property-read int|null $otp_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newQuery()
 * @method static \Illuminate\Database\Query\Builder|Customer onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereBlockId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCellPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCloseReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereContactNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereContactPerson($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCustomerType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCustomerTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereDateClosed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereDeletedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereDesignation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereMembershipNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereMembershipTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereOpeningReceivable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePhoneOffice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePrimaryReferrer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereRemarks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereSecondaryReferrer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereSpecialCustomer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereTownId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereTownName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereWorkEmailAddress($value)
 * @method static \Illuminate\Database\Query\Builder|Customer withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Customer withoutTrashed()
 * @mixin \Eloquent
 * @property string|null $prefix
 * @property-read \Illuminate\Database\Eloquent\Collection|CustomerOtp[] $otps
 * @property-read int|null $otps_count
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePrefix($value)
 */
class Customer extends Authenticatable implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable, SoftDeletes, HasApiTokens;

    const controller = "App\Http\Controllers\Module\CustomerController";

    protected $guarded = [];

    protected $casts = [
        'opening_receivable' => 'decimal:2',
    ];

    public function customerBranches()
    {
        return $this->hasMany(CustomerBranch::class, 'customer_id', 'id');
    }

    public function customerType()
    {
        return $this->belongsTo('App\Models\Master\CustomerType', 'customer_type_id', 'id');
    }

    public function membershipType()
    {
        return $this->belongsTo('App\Models\Master\MembershipType');
    }

    public function customerDiscounts()
    {
        return $this->hasMany(CustomerDiscount::class);
    }

    public function otps()
    {
        return $this->hasMany(CustomerOtp::class, 'customer_id', 'id');
    }

    /**
     * get product price according to customer type
     * 
     * @param Product $product product to be checked for price
     * @return int price of product
     */
    public function productPrice($product)
    {
        return $this->customer_type_id == 1
            ? $product->price_corporate
            : ($this->customer_type_id == 2
                ? $product->price_home
                : ($this->customer_type_id == 3
                    ? $product->price
                    : ($this->customer_type_id == 4
                        ? $product->price_retailer
                        : $product->price
                    )
                )
            );
    }

    /**
     * Get product discount for customer
     * 
     * @param Product $product product which needs to be checked
     * @param Int $invoice_type type of discount to be checked
     * @return Int|Float  discount amount
     */
    public function productDiscount(Product $product, int $invoice_type) : int
    {
        $discount = $this->customerDiscounts()->where('product_id', $product->id)->where('invoice_type_id', $invoice_type)->first();
        
        if ($discount) {
            return $discount->price_discount;
        }

        return 0;
    }
    
    /**
     * Get discounted price of a product for a customer
     * according to invoice type
     * 
     * @param Product $product product to chcked for discount
     * @param Int $invoiceType disount to be checked according to invoice type
     * 
     * @return Float product price
     */
    public function discountedPrice(Product $product, int $invoice_type) : int
    {
        $productPrice = 0;
        $price = $this->customer_type_id == 1
            ? $product->price_corporate
            : ($this->customer_type_id == 2
                ? $product->price_home
                : ($this->customer_type_id == 3
                    ? $product->price
                    : ($this->customer_type_id == 4
                        ? $product->price_retailer
                        : $product->price
                    )
                )
            );

        $discount = $this->customerDiscounts()->where('product_id', $product->id)->where('invoice_type_id', $invoice_type)->first();

        if ($discount) {
            $productPrice = $price - $discount->price_discount;
        } else {
            $productPrice = $price;
        }

        return $productPrice;
    }
}
