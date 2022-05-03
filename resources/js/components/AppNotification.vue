<template>
    <div class="dropdown d-inline-block">
        <button type="button" class="btn btn-dual" id="page-header-notifications-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="markAsRead">
            <i class="fa fa-fw fa-bell"></i>
            <span class="badge badge-pill" :class="dynamicCLass">{{ unreadNotifications.length }}</span>
        </button>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0" aria-labelledby="page-header-notifications-dropdown">
            <div class="bg-primary rounded-top font-w600 text-white text-center p-3">
                Notifications
            </div>
            <div :class="[unreadNotifications.length ? 'notifications-div' : '']">
                <ul class="nav-items my-2">
                    <li v-for="unread in unreadNotifications">
                        <a class="text-dark media py-2" :href="unread.data.url">
                            <div class="mx-3">
                                <i class="fa fa-fw fa-check-circle text-success"></i>
                            </div>
                            <div class="media-body font-size-sm pr-2">
                                <div class="font-w600" v-text="unread.data.message"></div>
                                <div class="text-muted font-italic">{{ unread.data.created_at | moment  }}</div>
                            </div>
                        </a>
                    </li>

                    <li v-if="!unreadNotifications.length">
                        <a class="text-dark media py-2" href="javascript:void(0)">
                            <div class="media-body font-size-md text-center">
                                <div class="font-w600">No Notification</div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="p-2 border-top"> <!-- v-if="unreadNotifications.length" -->
                    <a class="btn btn-light btn-block text-center text-sm" href="javascript:void(0)">
                        View All
                    </a>
                </div>
            </div>
        </div>
    </div>
       
</template>

<script>
export default {
    props: ['userId', 'unreads'],
    data() {
        return {
            unreadNotifications: this.unreads,
            sound: "http://soundbible.com/mp3/Air%20Plane%20Ding-SoundBible.com-496729130.mp3",
            dynamicCLass: 'badge-secondary'
        }
    },
    methods: {
        markAsRead() {
            if (this.unreadNotifications.length) {
                this.dynamicCLass = 'badge-secondary';
                axios.get('/markAsRead');
            }
        },
        playSound(){
            let alert = new Audio(this.sound)
            alert.play()
        },
    },
    mounted() {
        Echo.private(`App.Models.User.${this.userId}`)
            .notification((notification) => {
                console.log(notification)
                // push notifications
                Push.Permission.request(() => {
                    Push.create("New Notification Received", {
                        body: notification.message,
                        icon: '/assets/media/favicons/apple-touch-icon-180x180.png',
                        timeout: 4000,
                        onClick: function () {
                            window.focus();
                            this.close();
                        }
                    });
                }, () => {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Please allow notification permission in order to receive push notifications.'
                    })
                }); 
                
                mdtoast('New Notification Received', {
                  interaction: true, actionText: 'OK', 
                  action: function(){
                    //TODO: Undo codes here...
                    this.hide(); // this is the toast instance
                  }
                });
                this.dynamicCLass = 'badge-success';
                this.playSound();
                let newUnreadNotifications = {
                    data: {
                        user: notification.user,
                        message: notification.message,
                        created_at: notification.created_at,
                        url: notification.url
                    }
                };
                this.unreadNotifications.push(newUnreadNotifications)
            });
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow();
      }
    }
}
</script>


<style lang="scss" scoped>
    .notifications-div {
        overflow-y: scroll; 
        max-height:250px;
    }
</style>