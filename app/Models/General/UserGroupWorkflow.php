<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\General\UserGroupWorkflow
 *
 * @property int $id
 * @property int|null $workflow_id
 * @property int|null $role_id
 * @property int|null $order_number
 * @property int|null $approval_by
 * @property int|null $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\General\Workflow|null $workflow
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow whereApprovalBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow whereOrderNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserGroupWorkflow whereWorkflowId($value)
 * @mixin \Eloquent
 */
class UserGroupWorkflow extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function workflow()
    {
    	return $this->belongsTo('App\Models\General\Workflow');
    }
    
}
