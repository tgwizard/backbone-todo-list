define(['jquery', 'backbone', 'underscore', 'TodoList', 'TodoItemView'], function($, Backbone, _, TodoList, TodoItemView) {
  var TodoListView = Backbone.View.extend({
    el: _.template($('#todo-list-template').html()),

    statusTemplate: _.template($('#status-template').html()),

    events: {
      'submit #add-new-todo': 'createNewTodo',
      'click .mark-all-as-done': 'markAllAsDone',
    },

    initialize: function(options) {
      $("#main").html(this.el);
      this.subviews = [];

      this.input = this.$("#add-new-todo input[name=title]");
      this.footer = this.$('#todo-footer');

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);

      return this;
    },

    destroy: function() {
      _.each(this.subviews, function(view) {
      view.destroy();
      });
      this.remove();
    },

    render: function() {
      var remaining = this.collection.remaining().length;
      this.footer.html(this.statusTemplate({remaining: remaining}));
      return this;
    },

    addOne: function(todo) {
      var view = new TodoItemView({ model: todo });
      this.subviews.push(view);
      this.$el.find("#todo-list-body").append(view.render().el);
    },

    addAll: function() {
      this.collection.each(this.addOne, this);
    },

    createNewTodo: function(e) {
      e.preventDefault();
      var title = this.input.val();
      this.collection.create({ title: title }, { wait: true });
      this.input.val('');
    },

    markAllAsDone: function(e) {
      e.preventDefault();
      this.collection.markAllAsDone();
    },
  });

  return TodoListView;
});
