export default () => ({
    // * DATA
    notifications: [],
    newMessage: false,
    // * GETTERS

    // * METHODS
    showNotifications() {
        // TODO: fetch unread notifications
        axios
            .post(route(`dashboard.fetch-notifications`), {
                type: "unread",
            })
            .then(({ data }) => (this.notifications = data))
            .catch((error) => alert("Something went wrong."));
    },
    // * Mark messages as read
    markAsRead() {
        this.newMessage = false;
        // TODO: mark unread notifications
        axios.get("/markAsRead");
    },

    // getters
    get ureadNotificationsCount() {
        return this.notifications.length;
    },

    // * APP INIT
    // init() {
    //     // TODO: Fetch user unread notifications
    //     this.showNotifications();

    //     // TODO: Listen for notification socket
    //     Echo.private(`App.Models.User.${userId}`)
    //         .notification((notification) => {
    //             this.notifications.unshift(notification)
    //             this.newMessage = true;

    //             var sound = new Howl({
    //                 src: ['/assets/sound/notify.mp3']
    //             });
    //             sound.play();

    //             Snackbar.show({
    //                 text: 'New Notification Received',
    //                 // showAction: false,
    //                 pos: "bottom-right",
    //                 backgroundColor: "#34495e"
    //             });
    //         });
    // }
});
