define(['backbone', 'underscore', 'router'], function(Backbone, _, router) {
  return Backbone.View.extend({
    el: _.template($('#not-found-template').html()),

    initialize: function(options) {
      Backbone.$("#main").html(this.el);
      return this;
    },

    destroy: function() {
      this.remove();
    },
  });
});
