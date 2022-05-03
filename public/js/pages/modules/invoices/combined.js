$(document).ready(function() {
    $('.siteDataTable tbody').on('dblclick', 'tr', function () {
        var data = $('.siteDataTable').DataTable().row( this ).data();
        viewInvoiceDetails(data.id, data.invoice_no);
    });
})