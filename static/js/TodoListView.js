define(['jquery', 'backbone', 'underscore', 'TodoList', 'TodoItemView'], function($, Backbone, _, TodoList, TodoItemView) {
    var todos = new TodoList();

    var TodoListView = Backbone.View.extend({
        el: $("#todo-app"),

        statusTemplate: _.template($('#status-template').html()),

        events: {
          'submit #add-new-todo': 'createNewTodo',
          'click .mark-all-as-done': 'markAllAsDone',
        },

        initialize: function() {
          this.input = this.$("#add-new-todo input[name=title]");
          this.footer = this.$('#todo-footer');

          this.listenTo(todos, 'add', this.addOne);
          this.listenTo(todos, 'reset', this.addAll);
          this.listenTo(todos, 'all', this.render);

          todos.fetch();
          return this;
        },

        render: function() {
          var remaining = todos.remaining().length;
          this.footer.html(this.statusTemplate({remaining: remaining}));
          return this;
        },

        addOne: function(todo) {
          var view = new TodoItemView({ model: todo });
          this.$el.find("#todo-list-body").append(view.render().el);
        },

        addAll: function() {
          todos.each(this.addOne, this);
        },

        createNewTodo: function(e) {
          e.preventDefault();
          var title = this.input.val();
          todos.create({ title: title }, { wait: true });
          this.input.val('');
        },

        markAllAsDone: function(e) {
          e.preventDefault();
          todos.markAllAsDone();
        }
    });

    return TodoListView;
});
