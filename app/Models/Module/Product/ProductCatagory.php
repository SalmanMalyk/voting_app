<?php

namespace App\Models\Module\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Module\Product\ProductCatagory
 *
 * @property int $id
 * @property string|null $deleted_at
 * @property int|null $user_id
 * @property string $title
 * @property int|null $visibility
 * @property int|null $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCatagory whereVisibility($value)
 * @mixin \Eloquent
 */
class ProductCatagory extends Model
{
    use HasFactory;

    protected $guarded = [];
}
