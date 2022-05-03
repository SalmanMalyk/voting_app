<?php

namespace App\Http\Controllers\Api\V1\Customer;

use App\Models\User;
use Aloha\Twilio\Twilio;
use App\Facade\Outreach\Outreach;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use App\Models\Module\Customer\Customer;
use App\Http\Controllers\Api\BaseController;
use App\Models\Module\Customer\CustomerBranch;
use Illuminate\Validation\ValidationException;

/**
 * @group User Authentication
 *
 * APIs for authentication of users
 */

class LoginController extends BaseController
{
    /**
     * this function will handle the otp send
     * 
     * @param Request $request {phone_no}
     */
    public function sendOtp(Request $request)
    {
        // validate
        $request->validate([
            'phone_no' => 'required'
        ]);

        $phone_no = Str::replace('-', '', $request->phone_no);
        // find customer against number
        $customerBranch = CustomerBranch::whereNotNull('contact_no')->whereRaw("REPLACE(contact_no, '-', '') LIKE ?", ["%$phone_no%"])->first();

        if($customerBranch) {
            
            try {
                DB::beginTransaction();
                // generate random otp
                $otp = $this->intCodeRandom(4);
                // TODO: delete previous otps
                $customerBranch->customer->otps()->where('status', 'pending')->delete();

                // TODO: store new hashed otp
                $customerBranch->customer->otps()->create([
                    'otp'       => Hash::make($otp),
                    'expire_at' => now('PKT')->addHour(1),
                    'status'    => 'pending'
                ]);

                // TODO: send message
                $message = "Your OTP for Erie App is: {$otp} and your membership ID is: {$customerBranch->customer->membership_no}.";
                $messagePhone = substr($request->phone_no, 1);
                Outreach::send($messagePhone, $message);
                
                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => 'Otp send successfully.'
                ], 200);
            } catch (\Throwable $th) {
                DB::rollBack();
                logger($th);
                return response()->json([
                    'success' => false,
                    'message' => 'Something went wrong.',
                    'error'   => $th->getMessage()
                ], 500);    
            }

            
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Account not found.'
            ], 404);
        }
        
    }


    public function verifyOtpAuth(Request $request)
    {
        // Validate
        $request->validate([
            'otp'           => 'required|min:4',
            'membership_no' => 'required'
        ]);

        // find customer
        $customer = Customer::where('membership_no', $request->membership_no)->first();


        if($customer) { // if customer was found
            // TODO: find customer otp
            $otp = $customer->otps()->where('status', 'pending')->where('expire_at', '>', now('PKT'))->orderBy('created_at', "DESC")->first();
            // TODO: check if otp was found
            if($otp) {
                // TODO: verify hashed otp
                if(Hash::check($request->otp, $otp->otp)) {
                    // TODO: update otp
                    $otp->update([
                        'status' => 'verified'
                    ]);
                    // TODO: delete previous tokens
                    $customer->tokens()->delete();
                    // TODO: Generate and send access token with customer data
                    return response()->json([
                        'success'   => true,
                        'token'     => $customer->createToken(config('app.name'))->plainTextToken,
                        'customer'  => $customer
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => "Invalid OTP."
                    ], 400);    
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => "No OTP found againt this customer. Please resend OTP."
                ], 404);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => "Membership number is invalid."
            ], 404);
        }
    }
    
    
    protected function intCodeRandom($length = 8)
    {
        $intMin = (10 ** $length) / 10; // 100...
        $intMax = (10 ** $length) - 1;  // 999...

        $codeRandom = mt_rand($intMin, $intMax);

        return $codeRandom;
    }
    
} // end of life ;)
