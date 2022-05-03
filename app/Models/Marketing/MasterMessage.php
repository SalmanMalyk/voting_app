<?php

namespace App\Models\Marketing;

use App\Enums\MessageType;
use App\Models\User;
use App\Models\Master\CustomerType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

/**
 * App\Models\Marketing\MasterMessage
 *
 * @property int $id
 * @property string|null $number_sequence
 * @property string|null $title
 * @property string|null $body
 * @property array|null $customer_type_ids
 * @property array|null $configuration
 * @property string|null $scheduled_at
 * @property int|null $created_by
 * @property bool|null $status
 * @property mixed|null $message_type
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage query()
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereConfiguration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereCustomerTypeIds($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereMessageType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereNumberSequence($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MasterMessage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class MasterMessage extends Model
{
    use HasFactory, HasJsonRelationships;

    protected $guarded = [];

    protected $casts = [
        'customer_type_ids' => 'array',
        'configuration' => 'json',
        'status'    => 'boolean',
        'message_type' => MessageType::class
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function($model) {
            $inc = 'M-'.sprintf('%03d', intval(parent::count()) + 1);
            $model->number_sequence =  $inc;
        });
    }

    public function customer_types()
    {
        return $this->belongsToJson(CustomerType::class, 'customer_type_ids', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
}
