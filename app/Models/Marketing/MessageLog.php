<?php

namespace App\Models\Marketing;

use App\Models\User;
use App\Enums\MessageSentType;
use App\Facade\Outreach\Outreach;
use Illuminate\Database\Eloquent\Model;
use App\Models\Module\Customer\CustomerBranch;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\Marketing\MessageLog
 *
 * @property int $id
 * @property string|null $compain
 * @property string|null $phone_no
 * @property string|null $body
 * @property int|null $customer_branch_id
 * @property int|null $sent_by
 * @property mixed|null $sending_type
 * @property string $status
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read CustomerBranch|null $customerBranch
 * @property-read User|null $sentBy
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog whereCompain($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog whereCustomerBranchId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog wherePhoneNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog whereSendingType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog whereSentBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageLog whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class MessageLog extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'sending_type' => MessageSentType::class
    ];

    public function sentBy()
    {
        return $this->belongsTo(User::class, 'sent_by', 'id');
    }

    public function customerBranch()
    {
        return $this->belongsTo(CustomerBranch::class);
    }



    // store methods
    public static function directMessage($number, $body)
    {
        $sendMessage = Outreach::send($number, $body);

        $numbers = explode(",", $number);

        foreach($numbers as $no) {
            self::create([
                'phone_no'      => $no,
                'body'          => $body,
                'sent_by'       => auth()->id(),
                'sending_type'  => MessageSentType::SendNow,
                'status'        => 'sent'
            ]);
        }
        
        return $sendMessage;
    }


    public static function customerBranchMessage($customer_branch_ids, $body)
    {
        $customerBranches = CustomerBranch::whereIn('id', json_decode($customer_branch_ids, true))->select('id', 'contact_no')->pluck('contact_no', 'id');
        if ($customerBranches) {
            $phone_numbers = $customerBranches->map(function ($item, $index) use ($body) {
                // create message log
                $number = "92" . substr(str_replace("-", "", $item), 1);
                self::create([
                    'phone_no'           => $number,
                    'customer_branch_id' => $index,
                    'body'               => $body,
                    'sent_by'            => auth()->id(),
                    'sending_type'       => MessageSentType::SendNow,
                    'status'             => 'sent'
                ]);
                return $number;
            })->implode(",");
        }

        $sendMessage = Outreach::send($phone_numbers, $body);

        return $sendMessage;
    }
}
