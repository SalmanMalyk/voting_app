var path = 'dashboard.marketing.sms';

$(function () {
    'use strict';

    $(document).on('click', '.add-master-message', function (event) {
        event.preventDefault();

        Swal2.fire({
            html: `asdasdasdasd`
        })
    })

    $(document).on('click', '.addKeywords', function (event) {
        event.preventDefault();

        var keywordWindow = window.open(route('dashboard.keywards'), "Insert Keywords", "width=300,height=350,left=130,top=240,scrollbars=0,menubar=0,resizable=0");
                            window.scroll(0, 0);
        if (!keywordWindow.opener) {
            keywordWindow.opener = self;
            keywordWindow.focus();
        }
    })

    $(document).on('submit', '#masterMessageForm', function(event) {
        event.preventDefault();

        let form = $(event.target)[0],
            formData = new FormData(this);
        
        Swal2.fire({
            title: `Are you sure?`,
            text: "Do you agree to store this message template?",
            icon: 'question',
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#e74c3c',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            allowOutsideClick: false,
            backdrop: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal2.isLoading(),
            preConfirm: async () => {
                let customer_type_ids = $('#customer_type_ids').val();
                formData.append('customer_type_ids', JSON.stringify(customer_type_ids));
                await axios.post(route(`${path}.storeMasterMessage`), formData)
                    .then(({ data }) => {
                        Swal2.fire({
                            icon: 'success',
                            title: 'Success',
                            html: `${data.message}`,
                            confirmButtonText: 'OK',
                            allowOutsideClick: false,
                            backdrop: true,
                            confirmButtonColor: '#2ecc71'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        })
                        return data;
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
    })
    
    $(document).on('change', '[name="sender_type"]', function(event) {
        let sender_type        = $(event.target).val(),
            customer_selection = $('#customer_selection'),
            phone_no_selection = $('#phone_no_selection');

        if(sender_type == 'customer') {
            customer_selection.prop('hidden', false)
            $('#customer_branch_id').prop('required', true)
            phone_no_selection.prop('hidden', true)
            $('#phone_no').prop('required', false)
        } else if (sender_type == 'phone_no') {
            customer_selection.prop('hidden', true)
            $('#customer_branch_id').prop('required', false)
            phone_no_selection.prop('hidden', false)
            $('#phone_no').prop('required', true)
        }            
    })

    // send message form
    $(document).on('submit', '#sendMessageForm', function(event) {
        event.preventDefault();
        let form     = $(event.target)[0],
            formData = new FormData(this);

        Swal2.fire({
            title: `Are you sure?`,
            text: "Do you agree to send this message?",
            icon: 'question',
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#e74c3c',
            showCancelButton: true,
            confirmButtonText: 'Send Now',
            cancelButtonText: 'Cancel',
            allowOutsideClick: false,
            backdrop: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal2.isLoading(),
            preConfirm: async () => {
                let customer_branch_ids = $('#customer_branch_ids').val();
                formData.append('customer_branch_ids', JSON.stringify(customer_branch_ids));

                await axios.post(route(`${path}.storeSendMessage`), formData)
                    .then(({ data }) => {
                        Swal2.fire({
                            icon: 'success',
                            title: data.type,
                            html: `
                                ${data.response}
                                <br>
                                <small>Transaction ID: ${data.transactionID}</small>
                            `,
                            confirmButtonText: 'OK',
                            allowOutsideClick: false,
                            backdrop: true,
                            confirmButtonColor: '#2ecc71'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                form.reset();
                                $('.select2').val(null).trigger('change');
                            }
                        })
                        return data;
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
    })

    $('#customer_branch_ids').multiSelect({
        selectableHeader: "<div class='text-center bg-info-light font-w400 p-1 text-white font-sm mb-0'>Active Customer(s)</div>",
        selectionHeader: "<div class='text-center bg-success-light font-w400 p-1 text-white font-sm mb-0'>Selected Customer(s)</div>",
        keepOrder: true,
        selectableOptgroup: true
    });
})


const previewMessage = (body) => {
    let w = 600,
        h = 500;
    var x = (screen.width / 2) - (w / 2);
    var y = (screen.height / 2) - (h / 2);
    var keywordWindow = window.open("", "Preview Message", `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    keywordWindow.document.write(`<textarea style="width: 100%" rows="15" readonly>${body}</textarea>`);
    keywordWindow.focus();
    window.scroll(0, 0);
}

const isNumberKey = (evt) => {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 44 && charCode > 31
        && (charCode < 44 || charCode > 57))
        return false;

    return true;
}