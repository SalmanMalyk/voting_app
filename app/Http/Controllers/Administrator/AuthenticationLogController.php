<?php

namespace App\Http\Controllers\Administrator;

use DataTables;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\AuthenticationLog;
use App\Http\Controllers\Controller;
class AuthenticationLogController extends Controller
{
    public $path = 'administrator.info.';

    public $route;

    public function __construct()
    {
        if(isset(request()->route()->action['as'])) {
            $route = explode('.', request()->route()->action['as']);
            array_pop($route);
            $this->route = implode('.', $route);
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $logs = AuthenticationLog::with('user')
                                        ->where(function($query) {
                                            if(!auth()->user()->hasRole(['Super Admin', 'Executive Management'])) {
                                                $query->where('authenticatable_id', auth()->id());
                                            } else {
                                                $query->where('authenticatable_id', '!=', auth()->id());
                                            }
                                        })
                                        ->when(!empty($request->users), function($query) use ($request) {
                                            $query->whereIn('authenticatable_id', $request->users);
                                        })
                                        ->newQuery();

            return Datatables::eloquent($logs)
                            ->addIndexColumn()
                            ->editColumn('login_at', function ($row) {
                                return [
                                    'display'   => !empty($row->login_at) ? Carbon::parse($row->login_at)->format('d-M-Y, h:i a') : null,
                                    'timestamp' => !empty($row->login_at) ? Carbon::parse($row->login_at)->toDateTimeString() : null
                                ];
                            })
                            ->editColumn('logout_at', function ($row) {
                                return [
                                    'display'   => !empty($row->logout_at) ? Carbon::parse($row->logout_at)->format('d-M-Y, h:i a') : null,
                                    'timestamp' => !empty($row->logout_at) ? Carbon::parse($row->logout_at)->toDateTimeString() : null
                                ];
                            })
                            ->addColumn('session', function($row) {
                                return $row->logout_at ? Carbon::parse($row->logout_at)->diff(Carbon::parse($row->login_at))->format('%H:%I') : null;
                            })
                            ->toJson();
        }
        
        return view($this->path.'authentication_logs');
    }
}
