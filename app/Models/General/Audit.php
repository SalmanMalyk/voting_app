<?php

namespace App\Models\General;

use App\Models\Module\Customer\CustomerBranch;
use App\Models\Module\Invoice\Invoice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

/**
 * App\Models\General\Audit
 *
 * @property int $id
 * @property string|null $user_type
 * @property int|null $user_id
 * @property string $event
 * @property string $auditable_type
 * @property int $auditable_id
 * @property array|null $old_values
 * @property array|null $new_values
 * @property string|null $url
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property string|null $tags
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Model|\Eloquent $auditable
 * @property-read CustomerBranch|null $customerBranch
 * @property-read Invoice|null $invoice
 * @method static \Illuminate\Database\Eloquent\Builder|Audit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Audit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Audit query()
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereAuditableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereAuditableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereEvent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereNewValues($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereOldValues($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereUserAgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereUserType($value)
 * @mixin \Eloquent
 */
class Audit extends Model
{
    use HasFactory, HasJsonRelationships;

    protected $table = 'audits';

    protected $casts = [
        'old_values' => 'json',
        'new_values' => 'json',
    ];

    protected $dates = [
        'created_at'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')
                    ->withDefault([
                        'name' => 'N/A'
                    ]);
    }

    
    public function auditable()
    {
        return $this->morphTo();
    }
    
    public function customerBranch()
    {
        return $this->belongsTo(CustomerBranch::class, 'new_values->customer_branch_id', 'id');
    }
    

    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'auditable_id', 'temp_id', 'id');
    }
    
    
    
}
