<?php

namespace App\Models\General;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\General\WorkflowApprovable
 *
 * @property int $id
 * @property int $order_number
 * @property int|null $workflow_id
 * @property int|null $user_id
 * @property int|null $role_id
 * @property string $approvable_type
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable whereApprovableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable whereOrderNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowApprovable whereWorkflowId($value)
 * @mixin \Eloquent
 */
class WorkflowApprovable extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        parent::creating(function ($model) {
            $model->order_number = parent::max('order_number') + 1;
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
