<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Container\Container;
use App\Http\Controllers\Controller;
use App\Models\Reports\SchedulDelivery\ScheduleDelivery;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;

class AppController extends Controller
{
    /**
     * @param Request $request
     * @param String passowrd
     * @param String new_password
     * @return Response password update response
     */
    public function updatePassowrd(Request $request)
    {
        if($request->ajax() || $request->wantsJson()) {
            // FIND USER
            $user = auth()->user();

            /*
            * Validate all input fields
            */
            $this->validate($request, [
                'password' => [
                    'required',
                    function ($attribute, $value, $fail) use ($user) {
                        if (!Hash::check($value, $user->password)) {
                            $fail('Your password was not updated, since the provided current password does not match.');
                        }
                    }
                ],
                'new_password' => 'required|confirmed|min:8|different:password',
            ], [
                'password.required' => 'Please enter your old password.',
                'new_password.required' => 'Please enter new password.',
                'new_password.confirmed' => 'Please enter same new password.',
                'new_password.max' => 'New password must be 8 or longer.',
                'new_password.different' => 'New password must be different from old password.',
            ]);
            
            // check if old password match
            $user->fill([
                'password' => Hash::make($request->new_password)
            ])
            ->save();
            
            return response()->json(['message' => 'Password updated successfully.'], 200);
        }
    }

    public function index()
    {

        return view('dashboard');
    }

    public function getModelAudits(Request $request)
    {   
        try {
            $model = collect(File::allFiles(app_path()))
                        ->map(function ($item) {
                            $path = $item->getRelativePathName();
                            $class = sprintf(
                                '\%s%s',
                                Container::getInstance()->getNamespace(),
                                strtr(substr($path, 0, strrpos($path, '.')), '/', '\\')
                            );
                            return $class;
                        })
                        ->filter(function ($class) {
                            $valid = false;
                            if (class_exists($class)) {
                                $reflection = new \ReflectionClass($class);
                                $valid = $reflection->isSubclassOf(Model::class) && !$reflection->isAbstract();
                            }
                            return $valid;
                        })
                        ->filter(function ($class) use ($request) {
                            return strtoupper(getModelNameOnly($class)) == strtoupper($request->filters['auditable_type']);
                        })
                        ->first();
                        
            if(!empty($model)) {
                logger('Generated Model: ', [
                    'model' => $model
                ]);
                $data = (new $model)->where('id', $request->filters['auditable_id'])->first();
                $data = isset($data->audits) ? $data->audits()->with('user')->latest()->get() : [];
    
                return response()->json([
                    'success' => true,
                    'view'    => view('components.audits-view', [
                                    'data'  => $data
                                ])->render()
                ], 200);
            } else {
                throw new \Throwable('Model Not Found.');
            }


        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
                'code'    => $th->getCode(),
                'line'    => $th->getLine()
            ], 500);
        }
        

        
    }

    /**
     * fetch notifications for speficic user
     * 
     * @param Request $request
     */
    public function fetchNotifications(Request $request)
    {
        if ($request->exists('type') && $request->type == 'unread') {
            return collect(auth()->user()->unreadNotifications()->latest()->take(5)->get())->toJson();
        } else {
            return collect(auth()->user()->notifications)->toJson();
        }
    }
}



// throw ValidationException::withMessages(['field_name' => 'This value is incorrect']);