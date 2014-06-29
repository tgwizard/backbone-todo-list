define(['backbone', 'underscore'], function(Backbone, _) {
  return Backbone.View.extend({
    el: _.template($('#select-list-template').html()),

    events: {
      'submit #select-todo-list': 'selectTodoList',
    },

    initialize: function(options) {
      Backbone.$("#main").html(this.el);
      this.input = this.$("#select-todo-list input[name=list-id]");
      return this;
    },

    destroy: function() {
      this.remove();
    },

    selectTodoList: function(e) {
      e.preventDefault();
      var listId = this.input.val();
      listId = listId.replace(/^\s+|\s+$/g, '');
      this.input.val('');
      Backbone.history.navigate('lists/' + listId, { trigger: true });
    }
  });
});
