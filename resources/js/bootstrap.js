import Alpine from "alpinejs";
import axios from "axios";
import swal from "sweetalert";
import Swal2 from "sweetalert2/dist/sweetalert2.js";
import route from "ziggy";
import { Ziggy } from "./ziggy";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
import Snackbar from "node-snackbar";
// import { Howl, Howler } from "howler";
// import persist from "@alpinejs/persist";

const Toast = Swal2.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal2.stopTimer);
        toast.addEventListener("mouseleave", Swal2.resumeTimer);
    },
});

window.Alpine = Alpine;
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.swal = swal;
window.Swal2 = Swal2;
window.Toast = Toast;
window.route = route;
window.Ziggy = Ziggy;
// window.Pusher = Pusher;
window.Snackbar = Snackbar;

import "./custom/global";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// window.Echo = new Echo({
//     broadcaster: "pusher",
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true,
// });
