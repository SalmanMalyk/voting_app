<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Builder;

class DataController extends Controller
{
    public function getRoleName(Request $request)
    {
        return Role::query()
                    ->clearout()
                    ->where('name', 'LIKE', "%$request->q%")
                    ->pluck('name', 'id');
    }

    public function getUsersByParam(Request $request, Role $role)
    {
    	return $role->pluck('name', 'id');
    }


    public function getUserByRole(Request $request) : Collection
    {
        $params = $request->rmb;
        $users = User::whereHas("roles", function($builder) use ($params) {
                            return $builder->whereIn("id", $params);
                        })
                        ->where('name', 'LIKE', "%$request->q%")
                        ->pluck('name', 'id');
        return $users;
    }

    /**
     * Get all customer types.
     *
     * @return Collection
     */
    public function getCustomerTypes(Request $request): Collection
    {
        return Cache::rememberForever('customer_types', function() use ($request) {
            return CustomerType::where('name', 'LIKE', "%$request->q%")->pluck('name', 'id');
        });
    }
    
    /**
     * Get all membership types.
     *
     * @return Collection
     */
    public function getMembershipTypes(Request $request): Collection
    {
        return Cache::rememberForever('membership_types', function () use ($request) {
            return MembershipType::where('name', 'LIKE', "%$request->q%")->pluck('name', 'id');
        });
    }
    
    /**
     * Get all towns.
     *
     * @return Collection
     */
    public function getTowns(Request $request): Collection
    {
        return Town::query()
                    ->where('name', 'LIKE', "%$request->q%")
                    ->orderBy('name', 'ASC')
                    ->active()
                    ->limit(10)
                    ->pluck('name', 'id');
    }
    
    /**
     * @param Request $request->town_id
     * Get all blocks.
     *
     * @return Collection
     */
    public function getTownBlocks(Request $request): Collection
    {
        return Block::query()
                    ->when($request->town_id, function(Builder $builder, $town) {
                        return $builder->where('town_id', $town);
                    })
                    ->where('name', 'LIKE', "%$request->q%")
                    ->orderBy('name', 'ASC')
                    ->active()
                    ->pluck('name', 'id');
    } 
    /**
     * @param Request $request->town_id
     * Get all zones.
     *
     * @return Collection
     */
    public function getAllZones(Request $request): Collection
    {
        return Zone::active()
                    ->where('name', 'LIKE', '%'.$request->q . '%')
                    ->orderBy('name', 'ASC')
                    ->pluck('name', 'id');
    }
    
    /**
     * @param Request
     * Get all products.
     *
     * @return Collection
     */
    public function getAllProducts(Request $request): Collection
    {
        return Product::active()->where('name', 'LIKE', "%$request->q%")->pluck('name', 'id');
    }
        
    /**
     * @param Request
     * Get all users list.
     *
     * @return Collection
     */
    public function getAllUsersList(Request $request): Collection
    {
        return User::where('name', 'LIKE', "%$request->q%")->pluck('name', 'id');
    }

    public function getTownByNullZone(Request $request)
    {
        return Town::active()->when(empty($request->zone_id) && ($request->zone_id!=0), function($query) {
                return $query->whereNull('zone_id');
            },
            function($query) use($request){
                return $query->where('zone_id',$request->zone_id);
            }
        )->pluck('name','id');
    }

    /**
     * search through buildings or streets from customer branches
     *
     * @param Request
     * @return Collection
     */
    public function searchThroughAddress(Request $request) : Collection
    {
        try {
            $type = $request->type;
            if($request->exists('type') && ($type == 'building' || $type == 'street')) {
                $param = strtoupper($request->search);
                $customerBranches = CustomerBranch::distinct()
                                                    ->whereRaw("UPPER($type) LIKE ?", ["%$param%"])
                                                    ->get($type)
                                                    ->makeHidden(['customer_name', 'location', 'complete_name', 'address']);
                return $customerBranches;
            } else {
                abort(404);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'code' => $th->getCode(),
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * get avaiable vehicles
     *
     * @param Request
     * @return Collection
     */
    public function getScheduleVehicles(Request $request)
    {
        try {

            $date = $request->delivery_date;
            $q = strtoupper($request->q);
            $vehicles = Vehicle::where('status', true)
                            ->whereRaw("UPPER(CONCAT(manufacturer, ' ', plate_no)) LIKE ?", ["%{$q}%"])
                            ->orWhereRaw("UPPER(manufacturer) LIKE ?", ["%{$q}%"])
                            ->orWhereRaw("UPPER(plate_no) LIKE ?", ["%{$q}%"])
                            // ->whereDoesntHave('schedules', function(Builder $builder) use ($request) {
                            //     return $builder->whereDate('delivery_schedule', $request->delivery_date)
                            //                    ->whereNotIn('status', [2]);
                            // })
                            ->get()
                            ->pluck('vehicle_name', 'id');

            return $vehicles;
            
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * get vehicle info
     *
     * @param Vehicle {$vehicle}
     * @return Collection
     */
    public function getVehicleInfo(Vehicle $vehicle)
    {
        return $vehicle;
    }


    public function getDeliveryScheduleInfo(ScheduleDelivery $scheduleDelivery)
    {
        $scheduleDelivery->load([
            'attachments'
        ]);

        return response($scheduleDelivery);
    }


    public function getPaymentTypes(Request $request)
    {
        if($request->ajax() || $request->wantsJson()) {
            return PaymentType::where('title', 'LIKE', "%{$request->q}%")->pluck('title', 'id');
        }
    }
}
