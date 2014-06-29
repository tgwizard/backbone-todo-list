requirejs.config({
    baseUrl: "/static/js",
    paths: {
        'jquery': '//code.jquery.com/jquery-1.10.2.min',
        'ttuikit': '//sdk.ttcdn.co/tt-uikit-0.11.0.min',
        'backbone': '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min'
    },
    shim: {
        'ttuikit': ['jquery'],
        'backbone': ['jquery']
    }
});

require(['jquery', 'ttuikit', 'TodoListView'], function($, ttuikit, TodoListView) {
    var todoListView = new TodoListView();
});
