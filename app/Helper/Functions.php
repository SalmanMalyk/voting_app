<?php

use App\Models\User;
use Illuminate\Support\Str;
use App\Models\General\AppSetting;
use Illuminate\Support\Collection;
use Illuminate\Container\Container;
use Harimayco\Menu\Models\MenuItems;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Notification;

	/**
	 * @param $find Find the expected string
	 * @param $replace Replace string with specific string
	 * @return String (string)
	 */
	if (!function_exists('moduleRoute')) {
		function moduleRoute($find, $replace, array $parameters = null) {
			return route(str_replace($find, $replace, request()->route()->action['as']), $parameters);
		}
	}

	/**
	 * @param $title Route Group Param
	 * @return String (string) Title of module passed in route group
	 */
	if (!function_exists('moduleTite')) {
		function moduleTite() {
			return isset(request()->route()->action['title']) ? '| '.request()->route()->action['title'] : '';
		}
	}

	/**
	 * @param $find Find the expected string 
	 * @param $replace Replace string with specific string
	 * @return String (string)
	 */
	if (!function_exists('routeExists')) {
		function routeExists($item): string {
			if(Str::contains($item, 'http')) {
				return $item;
			} else {
				if(Route::has($item)) {
					return route($item);
				} else {
					return '/page-not-found';
				}
			}
		}
	}

	/**
	 * @param $route Route Name 
	 * @return Boolean
	 * @desc Check wether current route is equal to the open route
	 */
	if (!function_exists('isRouteEqualTo')) {
		function isRouteEqualTo($route): string {
			return Route::currentRouteName() == $route ? 'active' : 's';
		}
	}


	/**
	 * @return Response Boolean (true, false)
	 * @param Permission $name
	 * @desc Checks wether permission exists or not
	 */
	if (!function_exists('permissionExists')) {
		function permissionExists($name) {
			return Permission::findByName($name) ? true : false;
		}
	}


	/**
	 * @return Collection $models
	 * @desc Return list of all models which extends model class
	 */
	if (!function_exists('getModelNames')) {
		function getModelNames(): Collection {
		    $models = collect(File::allFiles(app_path()))
				        ->map(function ($item) {
				            $path = $item->getRelativePathName();
				            $class = sprintf('\%s%s',
				                Container::getInstance()->getNamespace(),
				                strtr(substr($path, 0, strrpos($path, '.')), '/', '\\'));
				            return $class;
				        })
				        ->filter(function ($class) {
				            $valid = false;
				            if (class_exists($class)) {
				                $reflection = new \ReflectionClass($class);
				                $valid = $reflection->isSubclassOf(Model::class) && !$reflection->isAbstract();
				            }
				            return $valid;
				        });
		    return $models->values();
		}
	}

	if (!function_exists('getModelNameOnly')) {
		function getModelNameOnly($model) {
			$name = explode('\\', $model);
			return end($name);
		}
	}
	
	/**
	 * @param int $check
	 * @param string $else
	 * @return turnitin
	 */
		
	if (!function_exists('turnitin')) {
		function turnitin($check, $other = null, $else = '—') {
			return $check ? ($other ? $other : $check) : $else;
		}
	}
	
	/**
	 * @return total records of associative array
	 */
		
	if (!function_exists('sumArrayKey')) {
		function sumArrayKey($array, $key) {

			$total = 0;
			
			$array->map(function($item) use ($total, $key) {
				return $total += $item[$key];
			});

			return $total;
		}
	}


	if (!function_exists('menuTitle')) {
		function menuTitle($default = null)
		{
			$route = request()->route()->getName();
			$system_menu = MenuItems::where('link', $route)->select('label')->first();
			return $system_menu['label'] ?? $default;
		}
	}


	/**
	 *  Given a file, i.e. /css/base.css, replaces it with a string containing the
	 *  file's mtime, i.e. /css/base.1221534296.css.
	 *
	 *  @param $file  The file to be loaded.  Must be an absolute path (i.e.
	 *                starting with slash).
	 */
	if(!function_exists('auto_version')) {
		function auto_version($file)
		{
			if (!file_exists(public_path().'/'.$file)) {
				return $file;
			}

			$mtime = filemtime($file);

			if(config('app.env') == 'production') {
				$path = asset($file).'?mod='. $mtime;
			} else {
				$path = asset($file);
			}
			return $path;
		}
	}

	/**
	 * Get notification settings against provided notification class name
	 * 
	 * @param string $notification Notification class name
	 * 
	 * @return User users list of specific selected role from app settings
	 */
	if(!function_exists('notifiables')) {
		function notifiables(string $notification) : Collection {
			$setting = AppSetting::where('key', $notification)->first()->value ?? [5];
			return User::role($setting)->get();
		}
	}



	if(!function_exists('calculate_percentage')) {
		function calculate_percentage($first, $second)
		{
			$first = empty($first) ? 0 : $first;
			$second = empty($second) ? 1 : $second;

			return round(($first / $second) * 100);
		}
	}

	if(!function_exists('shortNumber')) {
		function shortNumber($num) 
		{
			$units = ['', 'K', 'M', 'B', 'T'];
			for ($i = 0; $num >= 1000; $i++) {
				$num /= 1000;
			}
			return round($num, 1) . $units[$i];
		}
	}
	
