<?php

namespace App\Models\General;

use App\Models\User;
use App\Enums\WorkflowState;
use App\Models\General\WorkflowRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\General\WorkflowRequestLog
 *
 * @property int $id
 * @property int|null $workflow_request_id
 * @property int|null $user_id
 * @property array|null $misc
 * @property string|null $remarks
 * @property mixed|null $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User|null $user
 * @property-read WorkflowRequest|null $workflowRequest
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog whereMisc($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog whereRemarks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequestLog whereWorkflowRequestId($value)
 * @mixin \Eloquent
 */
class WorkflowRequestLog extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'status' => WorkflowState::class,
        'misc'   => 'json'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function workflowRequest()
    {
        return $this->belongsTo(WorkflowRequest::class, 'workflow_request_id', 'id');
    }
}
