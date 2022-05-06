(self["webpackChunk"] = self["webpackChunk"] || []).push([["/js/app"],{

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");
/* harmony import */ var _components_AppComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/AppComponent */ "./resources/js/components/AppComponent.js");


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
// Vue.component('app-notifications', require('./components/AppNotification.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// const app = new Vue({
//     el: '#page-container',
// });
// include apline components

Alpine.data("App", _components_AppComponent__WEBPACK_IMPORTED_MODULE_1__["default"]);
Alpine.start(); // Howler.autoUnlock = false;

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpinejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpinejs */ "./node_modules/alpinejs/dist/module.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert */ "./node_modules/sweetalert/dist/sweetalert.min.js");
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2/dist/sweetalert2.js */ "./node_modules/sweetalert2/dist/sweetalert2.js");
/* harmony import */ var sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ziggy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ziggy */ "./vendor/tightenco/ziggy/dist/index.js");
/* harmony import */ var ziggy__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ziggy__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ziggy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ziggy */ "./resources/js/ziggy.js");
/* harmony import */ var node_snackbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! node-snackbar */ "./node_modules/node-snackbar/src/js/snackbar.js");
/* harmony import */ var node_snackbar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(node_snackbar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _custom_global__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom/global */ "./resources/js/custom/global.js");
/* harmony import */ var _custom_global__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_custom_global__WEBPACK_IMPORTED_MODULE_7__);





 // import Echo from "laravel-echo";
// import Pusher from "pusher-js";

 // import { Howl, Howler } from "howler";
// import persist from "@alpinejs/persist";

var Toast = sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_3___default().mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: function didOpen(toast) {
    toast.addEventListener("mouseenter", (sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_3___default().stopTimer));
    toast.addEventListener("mouseleave", (sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_3___default().resumeTimer));
  }
});
window.Alpine = alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"];
window.axios = (axios__WEBPACK_IMPORTED_MODULE_1___default());
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.swal = (sweetalert__WEBPACK_IMPORTED_MODULE_2___default());
window.Swal2 = (sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_3___default());
window.Toast = Toast;
window.route = (ziggy__WEBPACK_IMPORTED_MODULE_4___default());
window.Ziggy = _ziggy__WEBPACK_IMPORTED_MODULE_5__.Ziggy; // window.Pusher = Pusher;

window.Snackbar = (node_snackbar__WEBPACK_IMPORTED_MODULE_6___default());

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

/***/ }),

/***/ "./resources/js/components/AppComponent.js":
/*!*************************************************!*\
  !*** ./resources/js/components/AppComponent.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {
  return {
    // * DATA
    notifications: [],
    newMessage: false,
    // * GETTERS
    // * METHODS
    showNotifications: function showNotifications() {
      var _this = this;

      // TODO: fetch unread notifications
      axios.post(route("dashboard.fetch-notifications"), {
        type: "unread"
      }).then(function (_ref) {
        var data = _ref.data;
        return _this.notifications = data;
      })["catch"](function (error) {
        return alert("Something went wrong.");
      });
    },
    // * Mark messages as read
    markAsRead: function markAsRead() {
      this.newMessage = false; // TODO: mark unread notifications

      axios.get("/markAsRead");
    },

    // getters
    get ureadNotificationsCount() {
      return this.notifications.length;
    } // * APP INIT
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


  };
});

/***/ }),

/***/ "./resources/js/custom/global.js":
/*!***************************************!*\
  !*** ./resources/js/custom/global.js ***!
  \***************************************/
/***/ (() => {

$(document).ready(function () {
  $('.select2').select2();
  jQuery(function () {
    Dashmix.helpers(['select2']);
  });
});
$('[data-action="sidebar_toggle"]').click(function (e) {
  if (!localStorage.getItem("sidebar")) {
    // Check if theres anything in localstorage already
    localStorage.setItem("sidebar", "true");
  } else {
    if (localStorage.getItem("sidebar") === "true") {
      // toggle was on, turning it off
      localStorage.setItem("sidebar", "false");
    } else if (localStorage.getItem("sidebar") === "false") {
      // toggle was off, turning it on
      localStorage.setItem("sidebar", "true");
    }
  }
});
/**
 * Number.prototype.format(n, x)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */

Number.prototype.format = function (n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

$(document).on('click', '.reload-datatable', function (e) {
  e.preventDefault();
  $(".siteDataTable").DataTable().ajax.reload(null, false);
});

var resetForms = function resetForms(selector) {
  return new Promise(function (r) {
    $(selector)[0].reset();
    $("".concat(selector, " .select2")).val('').trigger('change');
  });
}; // if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function (err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }


window.cookieStorage = {
  getItem: function getItem(key) {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split("=");

      if (key == cookie[0].trim()) {
        return decodeURIComponent(cookie[1]);
      }
    }

    return null;
  },
  setItem: function setItem(key, value) {
    document.cookie = key + ' = ' + encodeURIComponent(value);
  }
};

/***/ }),

/***/ "./resources/js/ziggy.js":
/*!*******************************!*\
  !*** ./resources/js/ziggy.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ziggy": () => (/* binding */ Ziggy)
/* harmony export */ });
var Ziggy = {
  "url": "http:\/\/localhost:8000",
  "port": 8000,
  "defaults": {},
  "routes": {
    "debugbar.openhandler": {
      "uri": "_debugbar\/open",
      "methods": ["GET", "HEAD"]
    },
    "debugbar.clockwork": {
      "uri": "_debugbar\/clockwork\/{id}",
      "methods": ["GET", "HEAD"]
    },
    "debugbar.assets.css": {
      "uri": "_debugbar\/assets\/stylesheets",
      "methods": ["GET", "HEAD"]
    },
    "debugbar.assets.js": {
      "uri": "_debugbar\/assets\/javascript",
      "methods": ["GET", "HEAD"]
    },
    "debugbar.cache.delete": {
      "uri": "_debugbar\/cache\/{key}\/{tags?}",
      "methods": ["DELETE"]
    },
    "haddcustommenu": {
      "uri": "harimayco\/\/addcustommenu",
      "methods": ["POST"]
    },
    "hdeleteitemmenu": {
      "uri": "harimayco\/\/deleteitemmenu",
      "methods": ["POST"]
    },
    "hdeletemenug": {
      "uri": "harimayco\/\/deletemenug",
      "methods": ["POST"]
    },
    "hcreatenewmenu": {
      "uri": "harimayco\/\/createnewmenu",
      "methods": ["POST"]
    },
    "hgeneratemenucontrol": {
      "uri": "harimayco\/\/generatemenucontrol",
      "methods": ["POST"]
    },
    "hupdateitem": {
      "uri": "harimayco\/\/updateitem",
      "methods": ["POST"]
    },
    "scribe": {
      "uri": "apps\/api\/docs",
      "methods": ["GET", "HEAD"]
    },
    "scribe.postman": {
      "uri": "apps\/api\/docs.postman",
      "methods": ["GET", "HEAD"]
    },
    "scribe.openapi": {
      "uri": "apps\/api\/docs.openapi",
      "methods": ["GET", "HEAD"]
    },
    "login": {
      "uri": "login",
      "methods": ["GET", "HEAD"]
    },
    "logout": {
      "uri": "logout",
      "methods": ["POST"]
    },
    "password.request": {
      "uri": "forgot-password",
      "methods": ["GET", "HEAD"]
    },
    "password.reset": {
      "uri": "reset-password\/{token}",
      "methods": ["GET", "HEAD"]
    },
    "password.email": {
      "uri": "forgot-password",
      "methods": ["POST"]
    },
    "password.update": {
      "uri": "reset-password",
      "methods": ["POST"]
    },
    "register": {
      "uri": "register",
      "methods": ["GET", "HEAD"]
    },
    "user-profile-information.update": {
      "uri": "user\/profile-information",
      "methods": ["PUT"]
    },
    "user-password.update": {
      "uri": "user\/password",
      "methods": ["PUT"]
    },
    "password.confirmation": {
      "uri": "user\/confirmed-password-status",
      "methods": ["GET", "HEAD"]
    },
    "password.confirm": {
      "uri": "user\/confirm-password",
      "methods": ["POST"]
    },
    "two-factor.login": {
      "uri": "two-factor-challenge",
      "methods": ["GET", "HEAD"]
    },
    "two-factor.enable": {
      "uri": "user\/two-factor-authentication",
      "methods": ["POST"]
    },
    "two-factor.confirm": {
      "uri": "user\/confirmed-two-factor-authentication",
      "methods": ["POST"]
    },
    "two-factor.disable": {
      "uri": "user\/two-factor-authentication",
      "methods": ["DELETE"]
    },
    "two-factor.qr-code": {
      "uri": "user\/two-factor-qr-code",
      "methods": ["GET", "HEAD"]
    },
    "two-factor.secret-key": {
      "uri": "user\/two-factor-secret-key",
      "methods": ["GET", "HEAD"]
    },
    "two-factor.recovery-codes": {
      "uri": "user\/two-factor-recovery-codes",
      "methods": ["GET", "HEAD"]
    },
    "terms.show": {
      "uri": "terms-of-service",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.privacyPolicy": {
      "uri": "privacy-policy",
      "methods": ["GET", "HEAD"]
    },
    "profile.show": {
      "uri": "user\/profile",
      "methods": ["GET", "HEAD"]
    },
    "api-tokens.index": {
      "uri": "user\/api-tokens",
      "methods": ["GET", "HEAD"]
    },
    "api.invoices": {
      "uri": "api\/v1\/invoices\/{invoice}\/update",
      "methods": ["PATCH"],
      "bindings": {
        "invoice": "id"
      }
    },
    "api.customersdiscount.index": {
      "uri": "api\/get-customersdiscount-list",
      "methods": ["GET", "HEAD"]
    },
    "api.customers.index": {
      "uri": "api\/get-customers-list",
      "methods": ["GET", "HEAD"]
    },
    "api.getUsersByParam": {
      "uri": "api\/get-users-by-param",
      "methods": ["GET", "HEAD"]
    },
    "api.getUserByRole": {
      "uri": "api\/get-users-by-role",
      "methods": ["GET", "HEAD"]
    },
    "api.getAllUsersList": {
      "uri": "api\/getAllUsersList",
      "methods": ["GET", "HEAD"]
    },
    "api.getCustomerTypes": {
      "uri": "api\/getCustomerTypes",
      "methods": ["GET", "HEAD"]
    },
    "api.getMembershipTypes": {
      "uri": "api\/getMembershipTypes",
      "methods": ["GET", "HEAD"]
    },
    "api.getTowns": {
      "uri": "api\/getTowns",
      "methods": ["GET", "HEAD"]
    },
    "api.getTownBlocks": {
      "uri": "api\/getTownBlocks",
      "methods": ["GET", "HEAD"]
    },
    "api.getAllProducts": {
      "uri": "api\/getAllProducts",
      "methods": ["GET", "HEAD"]
    },
    "api.customers.show": {
      "uri": "api\/customers\/{customer}",
      "methods": ["GET", "HEAD"]
    },
    "api.getTownByNullZone": {
      "uri": "api\/getTownByNullZone",
      "methods": ["GET", "HEAD"]
    },
    "api.zones.index": {
      "uri": "api\/zones\/list",
      "methods": ["GET", "HEAD"]
    },
    "api.customers.customerLedgerInfo": {
      "uri": "api\/customer-ledger-info\/{branch}",
      "methods": ["GET", "HEAD"],
      "bindings": {
        "branch": "id"
      }
    },
    "api.invoices.getInvoiceDetails": {
      "uri": "api\/{invoice}\/get-invoice-details",
      "methods": ["GET", "HEAD"],
      "bindings": {
        "invoice": "id"
      }
    },
    "api.invoices.updateInvoiceDetails": {
      "uri": "api\/{invoice}\/update-invoice-details",
      "methods": ["POST"],
      "bindings": {
        "invoice": "id"
      }
    },
    "api.searchThroughAddress": {
      "uri": "api\/search-street-building",
      "methods": ["GET", "HEAD"]
    },
    "api.invoices.existingInvoice": {
      "uri": "api\/{customerBranch}\/existing-invoice",
      "methods": ["GET", "HEAD"],
      "bindings": {
        "customerBranch": "id"
      }
    },
    "api.getScheduleVehicles": {
      "uri": "api\/getScheduleVehicles",
      "methods": ["GET", "HEAD"]
    },
    "api.getVehicleInfo": {
      "uri": "api\/{vehicle}\/getVehicleInfo",
      "methods": ["GET", "HEAD"],
      "bindings": {
        "vehicle": "id"
      }
    },
    "api.getDeliveryScheduleInfo": {
      "uri": "api\/{scheduleDelivery}\/getDeliveryScheduleInfo",
      "methods": ["GET", "HEAD"],
      "bindings": {
        "scheduleDelivery": "id"
      }
    },
    "api.getPaymentTypes": {
      "uri": "api\/getPaymentTypes",
      "methods": ["GET", "HEAD"]
    },
    "api.dispatcher.login": {
      "uri": "api\/v1\/dispatcher\/login",
      "methods": ["POST"]
    },
    "api.dispatcher.": {
      "uri": "api\/v1\/dispatcher\/get-customer",
      "methods": ["POST"]
    },
    "api.customer.": {
      "uri": "api\/v1\/customer\/recent-orders",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.index": {
      "uri": "\/",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.": {
      "uri": "markAsRead",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.getModelAudits": {
      "uri": "audits",
      "methods": ["POST"]
    },
    "dashboard.password.update": {
      "uri": "update-user-password",
      "methods": ["POST"]
    },
    "dashboard.fetch-notifications": {
      "uri": "fetch-notifications",
      "methods": ["POST"]
    },
    "dashboard.users.adminUser": {
      "uri": "users\/admin",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.users.updateStatus": {
      "uri": "users\/update-status",
      "methods": ["PATCH"]
    },
    "dashboard.users.index": {
      "uri": "users",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.users.create": {
      "uri": "users\/create",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.users.store": {
      "uri": "users",
      "methods": ["POST"]
    },
    "dashboard.users.show": {
      "uri": "users\/{user}",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.users.edit": {
      "uri": "users\/{user}\/edit",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.users.update": {
      "uri": "users\/{user}",
      "methods": ["PUT", "PATCH"]
    },
    "dashboard.users.destroy": {
      "uri": "users\/{user}",
      "methods": ["DELETE"],
      "bindings": {
        "user": "id"
      }
    },
    "dashboard.config.menu_builder": {
      "uri": "general-configuration\/menu-builder",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.config.roles.index": {
      "uri": "general-configuration\/roles",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.config.roles.create": {
      "uri": "general-configuration\/roles\/create",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.config.roles.store": {
      "uri": "general-configuration\/roles",
      "methods": ["POST"]
    },
    "dashboard.config.roles.show": {
      "uri": "general-configuration\/roles\/{role}",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.config.roles.edit": {
      "uri": "general-configuration\/roles\/{role}\/edit",
      "methods": ["GET", "HEAD"],
      "bindings": {
        "role": "id"
      }
    },
    "dashboard.config.roles.update": {
      "uri": "general-configuration\/roles\/{role}",
      "methods": ["PUT", "PATCH"],
      "bindings": {
        "role": "id"
      }
    },
    "dashboard.config.roles.destroy": {
      "uri": "general-configuration\/roles\/{role}",
      "methods": ["DELETE"],
      "bindings": {
        "role": "id"
      }
    },
    "dashboard.config.permissions.index": {
      "uri": "general-configuration\/permissions",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.config.permissions.create": {
      "uri": "general-configuration\/permissions\/create",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.config.permissions.store": {
      "uri": "general-configuration\/permissions",
      "methods": ["POST"]
    },
    "dashboard.config.permissions.show": {
      "uri": "general-configuration\/permissions\/{permission}",
      "methods": ["GET", "HEAD"],
      "bindings": {
        "permission": "id"
      }
    },
    "dashboard.config.permissions.edit": {
      "uri": "general-configuration\/permissions\/{permission}\/edit",
      "methods": ["GET", "HEAD"],
      "bindings": {
        "permission": "id"
      }
    },
    "dashboard.config.permissions.update": {
      "uri": "general-configuration\/permissions\/{permission}",
      "methods": ["PUT", "PATCH"],
      "bindings": {
        "permission": "id"
      }
    },
    "dashboard.config.permissions.destroy": {
      "uri": "general-configuration\/permissions\/{permission}",
      "methods": ["DELETE"],
      "bindings": {
        "permission": "id"
      }
    },
    "dashboard.milestone.index": {
      "uri": "milestone",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.milestone.create": {
      "uri": "milestone\/create",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.milestone.store": {
      "uri": "milestone",
      "methods": ["POST"]
    },
    "dashboard.milestone.show": {
      "uri": "milestone\/{milestone}",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.milestone.edit": {
      "uri": "milestone\/{milestone}\/edit",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.milestone.update": {
      "uri": "milestone\/{milestone}",
      "methods": ["PUT", "PATCH"],
      "bindings": {
        "milestone": "id"
      }
    },
    "dashboard.milestone.destroy": {
      "uri": "milestone\/{milestone}",
      "methods": ["DELETE"],
      "bindings": {
        "milestone": "id"
      }
    },
    "dashboard.termsAndConditions": {
      "uri": "terms-and-conditions",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.updatetermsAndConditions": {
      "uri": "update-terms-and-conditions",
      "methods": ["POST"]
    },
    "dashboard.updatePrivacyPolicy": {
      "uri": "update-privacy-policy",
      "methods": ["POST"]
    },
    "dashboard.administrator.authentication-logs.index": {
      "uri": "administrator\/authentication-logs",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.administrator.authentication-logs.create": {
      "uri": "administrator\/authentication-logs\/create",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.administrator.authentication-logs.store": {
      "uri": "administrator\/authentication-logs",
      "methods": ["POST"]
    },
    "dashboard.administrator.authentication-logs.show": {
      "uri": "administrator\/authentication-logs\/{authentication_log}",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.administrator.authentication-logs.edit": {
      "uri": "administrator\/authentication-logs\/{authentication_log}\/edit",
      "methods": ["GET", "HEAD"]
    },
    "dashboard.administrator.authentication-logs.update": {
      "uri": "administrator\/authentication-logs\/{authentication_log}",
      "methods": ["PUT", "PATCH"]
    },
    "dashboard.administrator.authentication-logs.destroy": {
      "uri": "administrator\/authentication-logs\/{authentication_log}",
      "methods": ["DELETE"]
    }
  }
};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}



/***/ }),

/***/ "./vendor/tightenco/ziggy/dist/index.js":
/*!**********************************************!*\
  !*** ./vendor/tightenco/ziggy/dist/index.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, r) {
  "object" == ( false ? 0 : _typeof(exports)) && "undefined" != "object" ? module.exports = r() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (r),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(this, function () {
  function t(t, r) {
    for (var n = 0; n < r.length; n++) {
      var e = r[n];
      e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e);
    }
  }

  function r(r, n, e) {
    return n && t(r.prototype, n), e && t(r, e), Object.defineProperty(r, "prototype", {
      writable: !1
    }), r;
  }

  function n() {
    return n = Object.assign || function (t) {
      for (var r = 1; r < arguments.length; r++) {
        var n = arguments[r];

        for (var e in n) {
          Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
        }
      }

      return t;
    }, n.apply(this, arguments);
  }

  function e(t) {
    return e = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, e(t);
  }

  function o(t, r) {
    return o = Object.setPrototypeOf || function (t, r) {
      return t.__proto__ = r, t;
    }, o(t, r);
  }

  function i() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;

    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
    } catch (t) {
      return !1;
    }
  }

  function u(t, r, n) {
    return u = i() ? Reflect.construct : function (t, r, n) {
      var e = [null];
      e.push.apply(e, r);
      var i = new (Function.bind.apply(t, e))();
      return n && o(i, n.prototype), i;
    }, u.apply(null, arguments);
  }

  function f(t) {
    var r = "function" == typeof Map ? new Map() : void 0;
    return f = function f(t) {
      if (null === t || -1 === Function.toString.call(t).indexOf("[native code]")) return t;
      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");

      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, n);
      }

      function n() {
        return u(t, arguments, e(this).constructor);
      }

      return n.prototype = Object.create(t.prototype, {
        constructor: {
          value: n,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), o(n, t);
    }, f(t);
  }

  var a = String.prototype.replace,
      c = /%20/g,
      l = "RFC3986",
      s = {
    "default": l,
    formatters: {
      RFC1738: function RFC1738(t) {
        return a.call(t, c, "+");
      },
      RFC3986: function RFC3986(t) {
        return String(t);
      }
    },
    RFC1738: "RFC1738",
    RFC3986: l
  },
      v = Object.prototype.hasOwnProperty,
      p = Array.isArray,
      y = function () {
    for (var t = [], r = 0; r < 256; ++r) {
      t.push("%" + ((r < 16 ? "0" : "") + r.toString(16)).toUpperCase());
    }

    return t;
  }(),
      d = function d(t, r) {
    for (var n = r && r.plainObjects ? Object.create(null) : {}, e = 0; e < t.length; ++e) {
      void 0 !== t[e] && (n[e] = t[e]);
    }

    return n;
  },
      b = {
    arrayToObject: d,
    assign: function assign(t, r) {
      return Object.keys(r).reduce(function (t, n) {
        return t[n] = r[n], t;
      }, t);
    },
    combine: function combine(t, r) {
      return [].concat(t, r);
    },
    compact: function compact(t) {
      for (var r = [{
        obj: {
          o: t
        },
        prop: "o"
      }], n = [], e = 0; e < r.length; ++e) {
        for (var o = r[e], i = o.obj[o.prop], u = Object.keys(i), f = 0; f < u.length; ++f) {
          var a = u[f],
              c = i[a];
          "object" == _typeof(c) && null !== c && -1 === n.indexOf(c) && (r.push({
            obj: i,
            prop: a
          }), n.push(c));
        }
      }

      return function (t) {
        for (; t.length > 1;) {
          var r = t.pop(),
              n = r.obj[r.prop];

          if (p(n)) {
            for (var e = [], o = 0; o < n.length; ++o) {
              void 0 !== n[o] && e.push(n[o]);
            }

            r.obj[r.prop] = e;
          }
        }
      }(r), t;
    },
    decode: function decode(t, r, n) {
      var e = t.replace(/\+/g, " ");
      if ("iso-8859-1" === n) return e.replace(/%[0-9a-f]{2}/gi, unescape);

      try {
        return decodeURIComponent(e);
      } catch (t) {
        return e;
      }
    },
    encode: function encode(t, r, n, e, o) {
      if (0 === t.length) return t;
      var i = t;
      if ("symbol" == _typeof(t) ? i = Symbol.prototype.toString.call(t) : "string" != typeof t && (i = String(t)), "iso-8859-1" === n) return escape(i).replace(/%u[0-9a-f]{4}/gi, function (t) {
        return "%26%23" + parseInt(t.slice(2), 16) + "%3B";
      });

      for (var u = "", f = 0; f < i.length; ++f) {
        var a = i.charCodeAt(f);
        45 === a || 46 === a || 95 === a || 126 === a || a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122 || o === s.RFC1738 && (40 === a || 41 === a) ? u += i.charAt(f) : a < 128 ? u += y[a] : a < 2048 ? u += y[192 | a >> 6] + y[128 | 63 & a] : a < 55296 || a >= 57344 ? u += y[224 | a >> 12] + y[128 | a >> 6 & 63] + y[128 | 63 & a] : (a = 65536 + ((1023 & a) << 10 | 1023 & i.charCodeAt(f += 1)), u += y[240 | a >> 18] + y[128 | a >> 12 & 63] + y[128 | a >> 6 & 63] + y[128 | 63 & a]);
      }

      return u;
    },
    isBuffer: function isBuffer(t) {
      return !(!t || "object" != _typeof(t) || !(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t)));
    },
    isRegExp: function isRegExp(t) {
      return "[object RegExp]" === Object.prototype.toString.call(t);
    },
    maybeMap: function maybeMap(t, r) {
      if (p(t)) {
        for (var n = [], e = 0; e < t.length; e += 1) {
          n.push(r(t[e]));
        }

        return n;
      }

      return r(t);
    },
    merge: function t(r, n, e) {
      if (!n) return r;

      if ("object" != _typeof(n)) {
        if (p(r)) r.push(n);else {
          if (!r || "object" != _typeof(r)) return [r, n];
          (e && (e.plainObjects || e.allowPrototypes) || !v.call(Object.prototype, n)) && (r[n] = !0);
        }
        return r;
      }

      if (!r || "object" != _typeof(r)) return [r].concat(n);
      var o = r;
      return p(r) && !p(n) && (o = d(r, e)), p(r) && p(n) ? (n.forEach(function (n, o) {
        if (v.call(r, o)) {
          var i = r[o];
          i && "object" == _typeof(i) && n && "object" == _typeof(n) ? r[o] = t(i, n, e) : r.push(n);
        } else r[o] = n;
      }), r) : Object.keys(n).reduce(function (r, o) {
        var i = n[o];
        return r[o] = v.call(r, o) ? t(r[o], i, e) : i, r;
      }, o);
    }
  },
      h = Object.prototype.hasOwnProperty,
      m = {
    brackets: function brackets(t) {
      return t + "[]";
    },
    comma: "comma",
    indices: function indices(t, r) {
      return t + "[" + r + "]";
    },
    repeat: function repeat(t) {
      return t;
    }
  },
      g = Array.isArray,
      j = String.prototype.split,
      w = Array.prototype.push,
      O = function O(t, r) {
    w.apply(t, g(r) ? r : [r]);
  },
      E = Date.prototype.toISOString,
      R = s["default"],
      S = {
    addQueryPrefix: !1,
    allowDots: !1,
    charset: "utf-8",
    charsetSentinel: !1,
    delimiter: "&",
    encode: !0,
    encoder: b.encode,
    encodeValuesOnly: !1,
    format: R,
    formatter: s.formatters[R],
    indices: !1,
    serializeDate: function serializeDate(t) {
      return E.call(t);
    },
    skipNulls: !1,
    strictNullHandling: !1
  },
      T = function t(r, n, e, o, i, u, f, a, c, l, s, v, p, y) {
    var d,
        h = r;

    if ("function" == typeof f ? h = f(n, h) : h instanceof Date ? h = l(h) : "comma" === e && g(h) && (h = b.maybeMap(h, function (t) {
      return t instanceof Date ? l(t) : t;
    })), null === h) {
      if (o) return u && !p ? u(n, S.encoder, y, "key", s) : n;
      h = "";
    }

    if ("string" == typeof (d = h) || "number" == typeof d || "boolean" == typeof d || "symbol" == _typeof(d) || "bigint" == typeof d || b.isBuffer(h)) {
      if (u) {
        var m = p ? n : u(n, S.encoder, y, "key", s);

        if ("comma" === e && p) {
          for (var w = j.call(String(h), ","), E = "", R = 0; R < w.length; ++R) {
            E += (0 === R ? "" : ",") + v(u(w[R], S.encoder, y, "value", s));
          }

          return [v(m) + "=" + E];
        }

        return [v(m) + "=" + v(u(h, S.encoder, y, "value", s))];
      }

      return [v(n) + "=" + v(String(h))];
    }

    var T,
        k = [];
    if (void 0 === h) return k;
    if ("comma" === e && g(h)) T = [{
      value: h.length > 0 ? h.join(",") || null : void 0
    }];else if (g(f)) T = f;else {
      var x = Object.keys(h);
      T = a ? x.sort(a) : x;
    }

    for (var N = 0; N < T.length; ++N) {
      var C = T[N],
          D = "object" == _typeof(C) && void 0 !== C.value ? C.value : h[C];

      if (!i || null !== D) {
        var F = g(h) ? "function" == typeof e ? e(n, C) : n : n + (c ? "." + C : "[" + C + "]");
        O(k, t(D, F, e, o, i, u, f, a, c, l, s, v, p, y));
      }
    }

    return k;
  },
      k = Object.prototype.hasOwnProperty,
      x = Array.isArray,
      N = {
    allowDots: !1,
    allowPrototypes: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decoder: b.decode,
    delimiter: "&",
    depth: 5,
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictNullHandling: !1
  },
      C = function C(t) {
    return t.replace(/&#(\d+);/g, function (t, r) {
      return String.fromCharCode(parseInt(r, 10));
    });
  },
      D = function D(t, r) {
    return t && "string" == typeof t && r.comma && t.indexOf(",") > -1 ? t.split(",") : t;
  },
      F = function F(t, r, n, e) {
    if (t) {
      var o = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t,
          i = /(\[[^[\]]*])/g,
          u = n.depth > 0 && /(\[[^[\]]*])/.exec(o),
          f = u ? o.slice(0, u.index) : o,
          a = [];

      if (f) {
        if (!n.plainObjects && k.call(Object.prototype, f) && !n.allowPrototypes) return;
        a.push(f);
      }

      for (var c = 0; n.depth > 0 && null !== (u = i.exec(o)) && c < n.depth;) {
        if (c += 1, !n.plainObjects && k.call(Object.prototype, u[1].slice(1, -1)) && !n.allowPrototypes) return;
        a.push(u[1]);
      }

      return u && a.push("[" + o.slice(u.index) + "]"), function (t, r, n, e) {
        for (var o = e ? r : D(r, n), i = t.length - 1; i >= 0; --i) {
          var u,
              f = t[i];
          if ("[]" === f && n.parseArrays) u = [].concat(o);else {
            u = n.plainObjects ? Object.create(null) : {};
            var a = "[" === f.charAt(0) && "]" === f.charAt(f.length - 1) ? f.slice(1, -1) : f,
                c = parseInt(a, 10);
            n.parseArrays || "" !== a ? !isNaN(c) && f !== a && String(c) === a && c >= 0 && n.parseArrays && c <= n.arrayLimit ? (u = [])[c] = o : "__proto__" !== a && (u[a] = o) : u = {
              0: o
            };
          }
          o = u;
        }

        return o;
      }(a, r, n, e);
    }
  },
      $ = function $(t, r) {
    var n = function (t) {
      if (!t) return N;
      if (null != t.decoder && "function" != typeof t.decoder) throw new TypeError("Decoder has to be a function.");
      if (void 0 !== t.charset && "utf-8" !== t.charset && "iso-8859-1" !== t.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      return {
        allowDots: void 0 === t.allowDots ? N.allowDots : !!t.allowDots,
        allowPrototypes: "boolean" == typeof t.allowPrototypes ? t.allowPrototypes : N.allowPrototypes,
        arrayLimit: "number" == typeof t.arrayLimit ? t.arrayLimit : N.arrayLimit,
        charset: void 0 === t.charset ? N.charset : t.charset,
        charsetSentinel: "boolean" == typeof t.charsetSentinel ? t.charsetSentinel : N.charsetSentinel,
        comma: "boolean" == typeof t.comma ? t.comma : N.comma,
        decoder: "function" == typeof t.decoder ? t.decoder : N.decoder,
        delimiter: "string" == typeof t.delimiter || b.isRegExp(t.delimiter) ? t.delimiter : N.delimiter,
        depth: "number" == typeof t.depth || !1 === t.depth ? +t.depth : N.depth,
        ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
        interpretNumericEntities: "boolean" == typeof t.interpretNumericEntities ? t.interpretNumericEntities : N.interpretNumericEntities,
        parameterLimit: "number" == typeof t.parameterLimit ? t.parameterLimit : N.parameterLimit,
        parseArrays: !1 !== t.parseArrays,
        plainObjects: "boolean" == typeof t.plainObjects ? t.plainObjects : N.plainObjects,
        strictNullHandling: "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : N.strictNullHandling
      };
    }(r);

    if ("" === t || null == t) return n.plainObjects ? Object.create(null) : {};

    for (var e = "string" == typeof t ? function (t, r) {
      var n,
          e = {},
          o = (r.ignoreQueryPrefix ? t.replace(/^\?/, "") : t).split(r.delimiter, Infinity === r.parameterLimit ? void 0 : r.parameterLimit),
          i = -1,
          u = r.charset;
      if (r.charsetSentinel) for (n = 0; n < o.length; ++n) {
        0 === o[n].indexOf("utf8=") && ("utf8=%E2%9C%93" === o[n] ? u = "utf-8" : "utf8=%26%2310003%3B" === o[n] && (u = "iso-8859-1"), i = n, n = o.length);
      }

      for (n = 0; n < o.length; ++n) {
        if (n !== i) {
          var f,
              a,
              c = o[n],
              l = c.indexOf("]="),
              s = -1 === l ? c.indexOf("=") : l + 1;
          -1 === s ? (f = r.decoder(c, N.decoder, u, "key"), a = r.strictNullHandling ? null : "") : (f = r.decoder(c.slice(0, s), N.decoder, u, "key"), a = b.maybeMap(D(c.slice(s + 1), r), function (t) {
            return r.decoder(t, N.decoder, u, "value");
          })), a && r.interpretNumericEntities && "iso-8859-1" === u && (a = C(a)), c.indexOf("[]=") > -1 && (a = x(a) ? [a] : a), e[f] = k.call(e, f) ? b.combine(e[f], a) : a;
        }
      }

      return e;
    }(t, n) : t, o = n.plainObjects ? Object.create(null) : {}, i = Object.keys(e), u = 0; u < i.length; ++u) {
      var f = i[u],
          a = F(f, e[f], n, "string" == typeof t);
      o = b.merge(o, a, n);
    }

    return b.compact(o);
  },
      A = /*#__PURE__*/function () {
    function t(t, r, n) {
      var e, o;
      this.name = t, this.definition = r, this.bindings = null != (e = r.bindings) ? e : {}, this.wheres = null != (o = r.wheres) ? o : {}, this.config = n;
    }

    var n = t.prototype;
    return n.matchesUrl = function (t) {
      var r = this;
      if (!this.definition.methods.includes("GET")) return !1;
      var n = this.template.replace(/(\/?){([^}?]*)(\??)}/g, function (t, n, e, o) {
        var i,
            u = "(?<" + e + ">" + ((null == (i = r.wheres[e]) ? void 0 : i.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
        return o ? "(" + n + u + ")?" : "" + n + u;
      }).replace(/^\w+:\/\//, ""),
          e = t.replace(/^\w+:\/\//, "").split("?"),
          o = e[0],
          i = e[1],
          u = new RegExp("^" + n + "/?$").exec(o);
      return !!u && {
        params: u.groups,
        query: $(i)
      };
    }, n.compile = function (t) {
      var r = this,
          n = this.parameterSegments;
      return n.length ? this.template.replace(/{([^}?]+)(\??)}/g, function (e, o, i) {
        var u, f, a;
        if (!i && [null, void 0].includes(t[o])) throw new Error("Ziggy error: '" + o + "' parameter is required for route '" + r.name + "'.");
        if (n[n.length - 1].name === o && ".*" === r.wheres[o]) return encodeURIComponent(null != (a = t[o]) ? a : "").replace(/%2F/g, "/");
        if (r.wheres[o] && !new RegExp("^" + (i ? "(" + r.wheres[o] + ")?" : r.wheres[o]) + "$").test(null != (u = t[o]) ? u : "")) throw new Error("Ziggy error: '" + o + "' parameter does not match required format '" + r.wheres[o] + "' for route '" + r.name + "'.");
        return encodeURIComponent(null != (f = t[o]) ? f : "");
      }).replace(/\/+$/, "") : this.template;
    }, r(t, [{
      key: "template",
      get: function get() {
        return ((this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "") + "/" + this.definition.uri).replace(/\/+$/, "");
      }
    }, {
      key: "parameterSegments",
      get: function get() {
        var t, r;
        return null != (t = null == (r = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r.map(function (t) {
          return {
            name: t.replace(/{|\??}/g, ""),
            required: !/\?}$/.test(t)
          };
        })) ? t : [];
      }
    }]), t;
  }(),
      P = /*#__PURE__*/function (t) {
    var e, i;

    function u(r, e, o, i) {
      var u;

      if (void 0 === o && (o = !0), (u = t.call(this) || this).t = null != i ? i : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, u.t = n({}, u.t, {
        absolute: o
      }), r) {
        if (!u.t.routes[r]) throw new Error("Ziggy error: route '" + r + "' is not in the route list.");
        u.i = new A(r, u.t.routes[r], u.t), u.u = u.l(e);
      }

      return u;
    }

    i = t, (e = u).prototype = Object.create(i.prototype), e.prototype.constructor = e, o(e, i);
    var f = u.prototype;
    return f.toString = function () {
      var t = this,
          r = Object.keys(this.u).filter(function (r) {
        return !t.i.parameterSegments.some(function (t) {
          return t.name === r;
        });
      }).filter(function (t) {
        return "_query" !== t;
      }).reduce(function (r, e) {
        var o;
        return n({}, r, ((o = {})[e] = t.u[e], o));
      }, {});
      return this.i.compile(this.u) + function (t, r) {
        var n,
            e = t,
            o = function (t) {
          if (!t) return S;
          if (null != t.encoder && "function" != typeof t.encoder) throw new TypeError("Encoder has to be a function.");
          var r = t.charset || S.charset;
          if (void 0 !== t.charset && "utf-8" !== t.charset && "iso-8859-1" !== t.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
          var n = s["default"];

          if (void 0 !== t.format) {
            if (!h.call(s.formatters, t.format)) throw new TypeError("Unknown format option provided.");
            n = t.format;
          }

          var e = s.formatters[n],
              o = S.filter;
          return ("function" == typeof t.filter || g(t.filter)) && (o = t.filter), {
            addQueryPrefix: "boolean" == typeof t.addQueryPrefix ? t.addQueryPrefix : S.addQueryPrefix,
            allowDots: void 0 === t.allowDots ? S.allowDots : !!t.allowDots,
            charset: r,
            charsetSentinel: "boolean" == typeof t.charsetSentinel ? t.charsetSentinel : S.charsetSentinel,
            delimiter: void 0 === t.delimiter ? S.delimiter : t.delimiter,
            encode: "boolean" == typeof t.encode ? t.encode : S.encode,
            encoder: "function" == typeof t.encoder ? t.encoder : S.encoder,
            encodeValuesOnly: "boolean" == typeof t.encodeValuesOnly ? t.encodeValuesOnly : S.encodeValuesOnly,
            filter: o,
            format: n,
            formatter: e,
            serializeDate: "function" == typeof t.serializeDate ? t.serializeDate : S.serializeDate,
            skipNulls: "boolean" == typeof t.skipNulls ? t.skipNulls : S.skipNulls,
            sort: "function" == typeof t.sort ? t.sort : null,
            strictNullHandling: "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : S.strictNullHandling
          };
        }(r);

        "function" == typeof o.filter ? e = (0, o.filter)("", e) : g(o.filter) && (n = o.filter);
        var i = [];
        if ("object" != _typeof(e) || null === e) return "";
        var u = m[r && r.arrayFormat in m ? r.arrayFormat : r && "indices" in r ? r.indices ? "indices" : "repeat" : "indices"];
        n || (n = Object.keys(e)), o.sort && n.sort(o.sort);

        for (var f = 0; f < n.length; ++f) {
          var a = n[f];
          o.skipNulls && null === e[a] || O(i, T(e[a], a, u, o.strictNullHandling, o.skipNulls, o.encode ? o.encoder : null, o.filter, o.sort, o.allowDots, o.serializeDate, o.format, o.formatter, o.encodeValuesOnly, o.charset));
        }

        var c = i.join(o.delimiter),
            l = !0 === o.addQueryPrefix ? "?" : "";
        return o.charsetSentinel && (l += "iso-8859-1" === o.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), c.length > 0 ? l + c : "";
      }(n({}, r, this.u._query), {
        addQueryPrefix: !0,
        arrayFormat: "indices",
        encodeValuesOnly: !0,
        skipNulls: !0,
        encoder: function encoder(t, r) {
          return "boolean" == typeof t ? Number(t) : r(t);
        }
      });
    }, f.v = function (t) {
      var r = this;
      t ? this.t.absolute && t.startsWith("/") && (t = this.p().host + t) : t = this.h();
      var e = {},
          o = Object.entries(this.t.routes).find(function (n) {
        return e = new A(n[0], n[1], r.t).matchesUrl(t);
      }) || [void 0, void 0];
      return n({
        name: o[0]
      }, e, {
        route: o[1]
      });
    }, f.h = function () {
      var t = this.p(),
          r = t.pathname,
          n = t.search;
      return (this.t.absolute ? t.host + r : r.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n;
    }, f.current = function (t, r) {
      var e = this.v(),
          o = e.name,
          i = e.params,
          u = e.query,
          f = e.route;
      if (!t) return o;
      var a = new RegExp("^" + t.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o);
      if ([null, void 0].includes(r) || !a) return a;
      var c = new A(o, f, this.t);
      r = this.l(r, c);
      var l = n({}, i, u);
      return !(!Object.values(r).every(function (t) {
        return !t;
      }) || Object.values(l).some(function (t) {
        return void 0 !== t;
      })) || Object.entries(r).every(function (t) {
        return l[t[0]] == t[1];
      });
    }, f.p = function () {
      var t,
          r,
          n,
          e,
          o,
          i,
          u = "undefined" != typeof window ? window.location : {},
          f = u.host,
          a = u.pathname,
          c = u.search;
      return {
        host: null != (t = null == (r = this.t.location) ? void 0 : r.host) ? t : void 0 === f ? "" : f,
        pathname: null != (n = null == (e = this.t.location) ? void 0 : e.pathname) ? n : void 0 === a ? "" : a,
        search: null != (o = null == (i = this.t.location) ? void 0 : i.search) ? o : void 0 === c ? "" : c
      };
    }, f.has = function (t) {
      return Object.keys(this.t.routes).includes(t);
    }, f.l = function (t, r) {
      var e = this;
      void 0 === t && (t = {}), void 0 === r && (r = this.i), t = ["string", "number"].includes(_typeof(t)) ? [t] : t;
      var o = r.parameterSegments.filter(function (t) {
        return !e.t.defaults[t.name];
      });
      if (Array.isArray(t)) t = t.reduce(function (t, r, e) {
        var i, u;
        return n({}, t, o[e] ? ((i = {})[o[e].name] = r, i) : "object" == _typeof(r) ? r : ((u = {})[r] = "", u));
      }, {});else if (1 === o.length && !t[o[0].name] && (t.hasOwnProperty(Object.values(r.bindings)[0]) || t.hasOwnProperty("id"))) {
        var i;
        (i = {})[o[0].name] = t, t = i;
      }
      return n({}, this.m(r), this.g(t, r));
    }, f.m = function (t) {
      var r = this;
      return t.parameterSegments.filter(function (t) {
        return r.t.defaults[t.name];
      }).reduce(function (t, e, o) {
        var i,
            u = e.name;
        return n({}, t, ((i = {})[u] = r.t.defaults[u], i));
      }, {});
    }, f.g = function (t, r) {
      var e = r.bindings,
          o = r.parameterSegments;
      return Object.entries(t).reduce(function (t, r) {
        var i,
            u,
            f = r[0],
            a = r[1];
        if (!a || "object" != _typeof(a) || Array.isArray(a) || !o.some(function (t) {
          return t.name === f;
        })) return n({}, t, ((u = {})[f] = a, u));

        if (!a.hasOwnProperty(e[f])) {
          if (!a.hasOwnProperty("id")) throw new Error("Ziggy error: object passed as '" + f + "' parameter is missing route model binding key '" + e[f] + "'.");
          e[f] = "id";
        }

        return n({}, t, ((i = {})[f] = a[e[f]], i));
      }, {});
    }, f.valueOf = function () {
      return this.toString();
    }, f.check = function (t) {
      return this.has(t);
    }, r(u, [{
      key: "params",
      get: function get() {
        var t = this.v();
        return n({}, t.params, t.query);
      }
    }]), u;
  }( /*#__PURE__*/f(String));

  return function (t, r, n, e) {
    var o = new P(t, r, n, e);
    return t ? o.toString() : o;
  };
});

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["css/app","/js/vendor"], () => (__webpack_exec__("./resources/js/app.js"), __webpack_exec__("./resources/sass/app.scss")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);