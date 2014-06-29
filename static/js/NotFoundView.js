define(['backbone', 'underscore'], function(Backbone, _) {
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
