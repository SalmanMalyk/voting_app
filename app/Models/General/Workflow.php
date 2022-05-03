<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Model;
use App\Models\General\WorkflowApprovable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\General\Workflow
 *
 * @property int $id
 * @property string|null $number_sequence
 * @property string|null $name
 * @property string|null $workflowable_model
 * @property string|null $method
 * @property int|null $user_id
 * @property int|null $status
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|WorkflowApprovable[] $approvables
 * @property-read int|null $approvables_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\General\WorkflowRequest[] $requests
 * @property-read int|null $requests_count
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow query()
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow whereMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow whereNumberSequence($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workflow whereWorkflowableModel($value)
 * @mixin \Eloquent
 */
class Workflow extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        parent::creating(function ($model) {
            $number_sequence =  sprintf('%05d', intval(parent::max('id')) + 1).': '. getModelNameOnly($model->workflowable_model) . ': '.(config('constants.workflow_methods')[$model->method] ?? null);
            $model->number_sequence = $number_sequence;
        });
    }
    
    public function approvables()
    {
        return $this->hasMany(WorkflowApprovable::class);
    }


    public function requests()
    {
        return $this->hasMany(WorkflowRequest::class);
    }

}
