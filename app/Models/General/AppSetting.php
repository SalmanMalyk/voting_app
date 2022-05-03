<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\General\AppSetting
 *
 * @property int $id
 * @property string|null $key
 * @property array|null $value
 * @property int|null $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting type($key)
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting values($key)
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppSetting whereValue($value)
 * @mixin \Eloquent
 */
class AppSetting extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'value' => 'array'
    ];
    
    public function scopeType($query, $key)
    {
        return $query->where('key', $key);
    }
    
    public function scopeValues($query, $key)
    {
        return $query->where('key', $key)->first()->value ?? [];
    }
}
