define(['backbone', 'TodoItem'], function(Backbone, TodoItem) {
  return Backbone.Collection.extend({
    model: TodoItem,

    initialize: function(models, options) {
      this.id = options.id;
    },

    url: function() {
      return '/api/lists/' + this.id + '/items/'
    },

    remaining: function() {
      return this.where({done: false});
    },

    markAllAsDone: function() {
      this.each(function(item) {
        if (item.get('done')) return;
        item.toggleDone();
      });
    }
  });

  return TodoList;
})
