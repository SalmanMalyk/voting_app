$(document).ready(function() {

    // handle autocomplete for building and town

    $("input.typeahead").each(function() {
        var $this = $(this),
            $type = $this.attr('data-search');


        $(this).typeahead({
            scrollBar: true,
            items: 10,
            ajax: {
                url: route('api.searchThroughAddress'),
                timeout: 500,
                displayField: $type,
                triggerLength: 1,
                method: "get",
                loadingClass: "loading-circle",
                preDispatch: function (query) {
                    return {
                        search: query,
                        type: $type
                    }
                },

                preProcess: function (data) {
                    if (data.success === false) {
                        // Hide the list, there was some error
                        
                        return false;
                    }
                    // We good!
                    return data;

                }
            }
        });
        
    })


})