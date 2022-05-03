<?php

namespace App\Models\Module\Payment;

use App\Traits\Workflow;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Contracts\Auditable;

/**
 * App\Models\Module\Payment\Payment
 *
 * @property int $id
 * @property int $customer_branch_id
 * @property int|null $invoice_id
 * @property int|null $invoice_type_id
 * @property int|null $customer_type_id
 * @property string|null $payment_date
 * @property string|null $bank_name
 * @property int|null $payment_type_id
 * @property string|null $document_number
 * @property float|null $amount
 * @property string|null $remarks
 * @property int|null $reason
 * @property int $status
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property int|null $deleted_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int|null $workflow_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read \App\Models\User|null $createdBy
 * @property-read \App\Models\Module\Customer\CustomerBranch $customerBranch
 * @property-read bool $has_workflow
 * @property-read bool $in_progress
 * @property-read array $workflow
 * @property-read \App\Models\Module\Payment\PaymentType|null $paymentType
 * @property-read \App\Models\User|null $updatedBy
 * @method static \Illuminate\Database\Eloquent\Builder|Payment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment newQuery()
 * @method static \Illuminate\Database\Query\Builder|Payment onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereBankName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereCustomerBranchId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereCustomerTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereDeletedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereDocumentNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereInvoiceTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePaymentDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePaymentTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereRemarks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereWorkflowStatus($value)
 * @method static \Illuminate\Database\Query\Builder|Payment withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Payment withoutTrashed()
 * @mixin \Eloquent
 */
class Payment extends Model implements Auditable
{
    use HasFactory, SoftDeletes, \OwenIt\Auditing\Auditable;

    const controller = "App\Http\Controllers\Module\PaymentController";

    protected $table = "payment_receiveds";
    
    protected $guarded = [];

    public function paymentType()
    {
    	return $this->belongsTo(PaymentType::class, 'payment_type_id', 'id');
    }
    
    public function customerBranch()
    {
    	return $this->belongsTo('App\Models\Module\Customer\CustomerBranch');
    }

    public function createdBy()
    {
        return $this->belongsTo('App\Models\User', 'created_by', 'id');
    }
    
    public function updatedBy()
    {
        return $this->belongsTo('App\Models\User', 'updated_by', 'id');
    }
}
