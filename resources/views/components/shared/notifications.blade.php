<div class="dropdown d-inline-block">
    <button type="button" class="btn btn-dual" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="markAsRead" {{-- @click="markAsRead" --}}>
        <i class="fa fa-fw fa-bell"></i>
        <span class="badge badge-pill" :class="newMessage || ureadNotificationsCount > 0 ? 'badge-success' : 'badge-secondary'" x-text="ureadNotificationsCount"></span>
    </button>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0">
        <div class="bg-primary rounded-top font-w600 text-white text-center p-3">
            Notifications
        </div>
        <div class="notifications-div">
            <ul class="nav-items my-2" style="max-height: 200px; overflow-y: scroll;">
                <template x-for="notification in notifications" :key="notification.id">
                    <li>
                        <a class="text-dark media py-2" :href="notification.data.url">
                            <div class="mx-3">
                                <i class="fas fa-fw fa-dot-circle text-success"></i>
                            </div>
                            <div class="media-body font-size-sm pr-2">
                                <div class="font-w600" x-text="notification.data.message"></div>
                                <div class="text-muted font-italic">
                                    <small x-if="notification.data.name" x-text="notification.data.from"></small> —
                                    <span x-text="moment(notification.created_at).fromNow()"></span> 
                                </div>
                            </div>
                        </a>
                    </li>
                </template>

                <template x-if="!notifications.length">
                    <li>
                        <a class="text-dark media py-2" href="javascript:void(0)">
                            <div class="mx-3">
                                <i class="fa fa-fw fa-exclamation-circle text-info"></i>
                            </div>
                            <div class="media-body font-size-sm pr-2">
                                <div class="font-w600">No New Notifications.</div>
                            </div>
                        </a>
                    </li>
                </template>
                
            </ul>
            <div class="p-2 border-top">
                <a class="btn btn-light btn-block text-center text-sm" href="javascript:void(0)">
                    View All
                </a>
            </div>
        </div>
    </div>
</div>