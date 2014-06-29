define(['backbone', 'TodoItem'], function(Backbone, TodoItem) {
  var TodoList = Backbone.Collection.extend({
    model: TodoItem,
    url: '/api/todos/',

    remaining: function() {
      return this.where({done: false});
    },

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
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
