<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddModuleColsToPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('permissions', function (Blueprint $table) {
            $table->unsignedBigInteger('menu_item_id')
                ->after('guard_name')
                ->nullable();
            $table->foreign('menu_item_id')
                ->references('id')
                ->on('admin_menu_items')
                ->onDelete('cascade');

            $table->string('permission_name')
                ->after('menu_item_id')
                ->nullable();

            $table->string('module_name')
                ->after('permission_name')
                ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('permissions', function (Blueprint $table) {
            $table->dropForeign(['menu_item_id']);
            $table->dropColumn(['menu_item_id', 'permission_name', 'module_name']);
        });
    }
}