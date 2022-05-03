<?php

namespace App\Http\Controllers\General;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\General\AppSetting;
use Spatie\Permission\Models\Role;
use Illuminate\Container\Container;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Notifications\Notification;

class AppSettingController extends Controller
{
    public $path = 'general_config.settings.';

    public $route;

    public function __construct()
    {
        if (isset(request()->route()->action['as'])) {
            $route = explode('.', request()->route()->action['as']);
            array_pop($route);
            $this->route = implode('.', $route);
        }
    }

    public function index(Request $request)
    {        
        $notifications =  collect(File::allFiles(app_path()))
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
                                            $valid = $reflection->isSubclassOf(Notification::class) && !$reflection->isAbstract();
                                        }
                                        return $valid;
                                    })
                                    ->map(function($item) {
                                        $str = explode('\\', $item);
                                        return end($str);
                                    })
                                    ->sort();

        return view($this->path . 'index', [
            'notifications' => $notifications,
            'appSettings'   => AppSetting::query(),
            'roles'         => Role::pluck('name', 'id')
        ]);
    }


    public function saveNotificationSettings(Request $request)
    {
        $request->validate([
            'notification' => 'required',
            'values'    => 'required'
        ]);

        $notification = str_replace('_', '', Str::title($request->notification));

        AppSetting::updateOrCreate(['key' => $notification], [
            'key'     => $notification,
            'value'   => $request->values,
            'user_id' => auth()->id()
        ]);
        
        return response()->json([
            'message' => 'Changes Updated Successfully.'
        ]);
    }
    
}
