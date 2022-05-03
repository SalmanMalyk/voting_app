$(document).ready(function () {
  $('.select2').select2()


  jQuery(function () {
    Dashmix.helpers(['select2']);
  });
})


$('[data-action="sidebar_toggle"]').click(e => {
  if (!localStorage.getItem("sidebar")) {
    // Check if theres anything in localstorage already
    localStorage.setItem("sidebar", "true");

  } else {
    if (localStorage.getItem("sidebar") === "true") {
      // toggle was on, turning it off
      localStorage.setItem("sidebar", "false");

    }
    else if (localStorage.getItem("sidebar") === "false") {
      // toggle was off, turning it on
      localStorage.setItem("sidebar", "true")

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


$(document).on('click', '.reload-datatable', e => {
  e.preventDefault();
  $(".siteDataTable").DataTable().ajax.reload(null, false);
})




const resetForms = (selector) => {
  return new Promise(r => {
    $(selector)[0].reset();
    $(`${selector} .select2`).val('').trigger('change');
  })
}



// if ('serviceWorker' in navigator) {
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
  getItem(key) {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split("=");
      if (key == cookie[0].trim()) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  },
  setItem(key, value) {
    document.cookie = key + ' = ' + encodeURIComponent(value)
  }
}