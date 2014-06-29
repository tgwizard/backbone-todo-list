requirejs.config({
  baseUrl: "/static/js",
  paths: {
    'jquery': '//code.jquery.com/jquery-1.10.2.min',
    'jquery-ui': '//code.jquery.com/ui/1.11.0/jquery-ui.min',
    'ttuikit': '//sdk.ttcdn.co/tt-uikit-0.11.0.min',
    'backbone': '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min'
  },
  shim: {
    'ttuikit': ['jquery', 'jquery-ui'],
    'backbone': ['jquery']
  }
});

require(['jquery', 'ttuikit', 'Router'], function($, ttuikit, router) {
  Backbone.history.start({ pushState: true });
});
