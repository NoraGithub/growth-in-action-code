$(document).ready(function () {
    $('#typeahead-input').typeahead({
        source: function (query, process) {
            return $.get('/api/blogpost/?format=json&title=' + query, function (data) {
                return process(data);
            });
        },
        updater: function (item) {
            return item;
        },
        displayText: function (item) {
            return item.title;
        },
        afterSelect: function (item) {
            location.href = 'http://localhost:8000/blog/' + item.slug + ".html";
        },
        delay: 500
    });

    $(document).pjax('a', 'body');

    $(document).on('pjax:start', function () {
        NProgress.start();
    });
    $(document).on('pjax:end', function () {
        NProgress.done();
        // self.siteBootUp();
    });
});
