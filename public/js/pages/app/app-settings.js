var path = "dashboard.config.app-settings";

const saveNotificationSettings = (notification) => {
    event.preventDefault();

    let tab = $(`#${notification}`).find('input[type="checkbox"]:checked');
    let values = [];

    tab.each((k, val) => {
        values[k] = val.value;
    });

    if (values.length <= 0) {
        $.notify('Please select at least 1 user group.')
        return;
    }

    let title = notification.replace('_', ' ')

    Swal2.fire({
        icon: 'question',
        title: 'Are you sure?',
        html: `Save notification changes for <b>${title}</b>?`,
        showCancelButton: true,
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save Changes',
        cancelButtonText: 'Cancel',
        allowOutsideClick: false,
        backdrop: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal2.isLoading(),
        preConfirm: async () => {
            await axios.post(route(`${path}.saveNotificationSettings`), {
                    values,
                    notification
                })
                .then(async ({ data }) => {
                    Snackbar.show({
                        text: data.message,
                        // showAction: false,
                        pos: "bottom-right",
                        backgroundColor: "#2ecc71",
                        textColor: "#fff",
                        actionTextColor: "#fff"
                    });
                })
                .catch(error => {
                    console.error(error)
                    if (error.response.status == 422) {
                        let messages = '';
                        $.each(error.response.data.errors, (k, v) => {
                            messages += `${v[0]} <br>`;
                        })
                        Swal2.showValidationMessage(
                            `${messages}`
                        )
                    } else {
                        Swal2.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    }
                })
        }
    })


}