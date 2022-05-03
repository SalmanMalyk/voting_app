<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static SuperAdmin()
 * @method static static Admin()
 * @method static static User()
 */
final class UserType extends Enum
{
    const SuperAdmin =   0;
    const Admin =   1;
    const User = 2;
}