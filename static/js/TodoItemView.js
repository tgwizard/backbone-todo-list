define(['backbone', 'underscore'], function(Backbone, _) {
    var TodoView = Backbone.View.extend({
      tagName: 'tr',

      template: _.template($('#item-template').html()),

      events: {
        'ifToggled input': 'toggleDone',
      },

      initialize: function() {
        this.listenTo(this.model, 'all', this.render);
      },

      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.find('input[type=checkbox]').check();
        return this;
      },

      toggleDone: function(e, x) {
        this.model.toggleDone();
      }
    });

    return TodoView;
});
