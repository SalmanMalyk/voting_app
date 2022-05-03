<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Master\CustomerType
 *
 * @property int $id
 * @property string|null $name
 * @property int|null $sort_order
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType query()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class CustomerType extends Model
{
    use HasFactory;
}
