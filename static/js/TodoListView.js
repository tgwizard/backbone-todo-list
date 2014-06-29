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
      this.input.focus(); // Would like to use autofocus, but it seems to only work on page reload

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

      this.$el.find("#todo-list-body").sortable({
        helper: function(e, tr) {
          // http://stackoverflow.com/questions/1307705/jquery-ui-sortable-with-table-and-tr-width/1372954#1372954
          var $originals = tr.children();
          var $helper = tr.clone();
          $helper.addClass('drag-helper');
          $helper.children().each(function(index)
          {
            // Set helper cell sizes to match the original sizes
            $(this).width($originals.eq(index).width());
          });
          return $helper;
        },
        handle: '.drag-handle',
        cursor: 'pointer',
        stop: function(event, ui) {
          ui.item.removeClass('drag-helper');
          ui.item.trigger('drop', ui.item.index());
        },
      });

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
