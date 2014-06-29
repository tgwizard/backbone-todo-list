define(['backbone', 'SelectListView', 'TodoList', 'TodoListView', 'NotFoundView'], function(Backbone, SelectListView, TodoList, TodoListView, NotFoundView) {
  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'lists/:id': 'list',
      '*404': 'notFound'
    },

    initialize: function() {
      var self = this;

      Backbone.$(document).on('click', 'a[href^="/"]', function(e) {
        var href = $(e.currentTarget).attr('href');

        if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
          e.preventDefault();
          var url = href.replace(/^\//,'').replace('\#\!\/','');
          self.navigate(url, { trigger: true });
        }
      });
    },

    index: function() {
      this.loadView(new SelectListView());
    },

    list: function(id) {
      var todoList = new TodoList([], { id: id });
      todoList.fetch();
      this.loadView(new TodoListView({collection: todoList}));
    },

    notFound: function() {
      this.loadView(new NotFoundView());
    },

    loadView: function(view) {
      if (this.view) this.view.remove();
      this.view = view;
    },
  });
})
