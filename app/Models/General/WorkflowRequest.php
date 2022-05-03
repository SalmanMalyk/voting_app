<?php

namespace App\Models\General;

use App\Enums\WorkflowState;
use App\Models\General\Workflow;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\General\WorkflowRequest
 *
 * @property int $id
 * @property int|null $workflow_id
 * @property int|null $user_id
 * @property array|null $old_values
 * @property array|null $new_values
 * @property string|null $comment
 * @property string|null $query
 * @property string|null $requestable_type
 * @property int|null $requestable_id
 * @property mixed|null $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\General\WorkflowRequestLog[] $logs
 * @property-read int|null $logs_count
 * @property-read User|null $user
 * @property-read Workflow|null $workflow
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereNewValues($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereOldValues($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereQuery($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereRequestableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereRequestableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkflowRequest whereWorkflowId($value)
 * @mixin \Eloquent
 */
class WorkflowRequest extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'status'     => WorkflowState::class,
        'old_values' => 'json',
        'new_values' => 'json'
    ];

    public function workflow()
    {
        return $this->belongsTo(Workflow::class);
    }

    public function logs()
    {
        return $this->hasMany(WorkflowRequestLog::class, 'workflow_request_id', 'id');
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
