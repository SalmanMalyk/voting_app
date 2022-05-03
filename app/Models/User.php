<?php

namespace App\Models;

use App\Traits\Workflow;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Permission\Traits\HasRoles;
use Yadahan\AuthenticationLog\AuthenticationLogable;

/**
 * App\Models\User
 *
 * @property int $id
 * @property int|null $branch_id
 * @property int|null $is_branch_manager
 * @property string|null $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property string|null $remember_token
 * @property int|null $current_team_id
 * @property string|null $profile_photo_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $father_name
 * @property string|null $date_of_birth
 * @property string|null $cnic_no
 * @property int|null $religion_id
 * @property int|null $gender_id
 * @property int|null $marital_status_id
 * @property string|null $blood_group_id
 * @property string|null $house_no
 * @property string|null $block_no
 * @property string|null $street_no
 * @property string|null $society_town
 * @property string|null $city
 * @property string|null $cell_phone
 * @property string|null $cell_phone_2
 * @property string|null $landline
 * @property string|null $phouse_no
 * @property string|null $pblock_no
 * @property string|null $pstree_no
 * @property string|null $psociety_town
 * @property string|null $pcity
 * @property string|null $plandline
 * @property string|null $referred_by
 * @property string|null $referred_contact
 * @property string|null $referred_relation
 * @property string|null $referrer_address
 * @property string|null $emergency_contact_person
 * @property string|null $emergency_contact_no
 * @property int|null $status
 * @property int|null $job_status
 * @property string|null $joining_date
 * @property string|null $leaving_date
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\OwenIt\Auditing\Models\Audit[] $audits
 * @property-read int|null $audits_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Yadahan\AuthenticationLog\AuthenticationLog[] $authentications
 * @property-read int|null $authentications_count
 * @property-read bool $has_workflow
 * @property-read bool $in_progress
 * @property-read string $profile_photo_url
 * @property-read array $workflow
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static Builder|User newModelQuery()
 * @method static Builder|User newQuery()
 * @method static \Illuminate\Database\Query\Builder|User onlyTrashed()
 * @method static Builder|User permission($permissions)
 * @method static Builder|User query()
 * @method static Builder|User role($roles, $guard = null)
 * @method static Builder|User whereBlockNo($value)
 * @method static Builder|User whereBloodGroupId($value)
 * @method static Builder|User whereBranchId($value)
 * @method static Builder|User whereCellPhone($value)
 * @method static Builder|User whereCellPhone2($value)
 * @method static Builder|User whereCity($value)
 * @method static Builder|User whereCnicNo($value)
 * @method static Builder|User whereCreatedAt($value)
 * @method static Builder|User whereCurrentTeamId($value)
 * @method static Builder|User whereDateOfBirth($value)
 * @method static Builder|User whereDeletedAt($value)
 * @method static Builder|User whereEmail($value)
 * @method static Builder|User whereEmailVerifiedAt($value)
 * @method static Builder|User whereEmergencyContactNo($value)
 * @method static Builder|User whereEmergencyContactPerson($value)
 * @method static Builder|User whereFatherName($value)
 * @method static Builder|User whereFirstName($value)
 * @method static Builder|User whereGenderId($value)
 * @method static Builder|User whereHouseNo($value)
 * @method static Builder|User whereId($value)
 * @method static Builder|User whereIsBranchManager($value)
 * @method static Builder|User whereJobStatus($value)
 * @method static Builder|User whereJoiningDate($value)
 * @method static Builder|User whereLandline($value)
 * @method static Builder|User whereLastName($value)
 * @method static Builder|User whereLeavingDate($value)
 * @method static Builder|User whereMaritalStatusId($value)
 * @method static Builder|User whereName($value)
 * @method static Builder|User wherePassword($value)
 * @method static Builder|User wherePblockNo($value)
 * @method static Builder|User wherePcity($value)
 * @method static Builder|User wherePhouseNo($value)
 * @method static Builder|User wherePlandline($value)
 * @method static Builder|User whereProfilePhotoPath($value)
 * @method static Builder|User wherePsocietyTown($value)
 * @method static Builder|User wherePstreeNo($value)
 * @method static Builder|User whereReferredBy($value)
 * @method static Builder|User whereReferredContact($value)
 * @method static Builder|User whereReferredRelation($value)
 * @method static Builder|User whereReferrerAddress($value)
 * @method static Builder|User whereReligionId($value)
 * @method static Builder|User whereRememberToken($value)
 * @method static Builder|User whereSocietyTown($value)
 * @method static Builder|User whereStatus($value)
 * @method static Builder|User whereStreetNo($value)
 * @method static Builder|User whereTwoFactorRecoveryCodes($value)
 * @method static Builder|User whereTwoFactorSecret($value)
 * @method static Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|User withTrashed()
 * @method static Builder|User withoutAdmin()
 * @method static \Illuminate\Database\Query\Builder|User withoutTrashed()
 * @mixin \Eloquent
 */
class User extends Authenticatable implements Auditable
{
    use \OwenIt\Auditing\Auditable, HasApiTokens, HasFactory, HasProfilePhoto, Notifiable, TwoFactorAuthenticatable, HasRoles, SoftDeletes, AuthenticationLogable;

    protected $guard_name = 'sanctum';

    protected $workflow_id = '5';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'profile_photo_url',
    ];


    public function scopeWithoutAdmin(Builder $builder)
    {
        return $builder->whereHas("roles", function($q){ $q->whereNotIn("name", ["Super Admin"]); });
    }


    /**
     * Get the default profile photo URL if no profile photo has been uploaded.
     *
     * @return string
     */
    protected function defaultProfilePhotoUrl()
    {
        $name = trim(collect(explode(' ', $this->name))->map(function ($segment) {
            return mb_substr($segment, 0, 1);
        })->join(' '));

        return 'https://ui-avatars.com/api/?name=' . urlencode($name);
    }
}
