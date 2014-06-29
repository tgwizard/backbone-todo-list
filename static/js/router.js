define(['backbone', 'SelectListView', 'TodoList', 'TodoListView', 'NotFoundView'],
  function(Backbone, SelectListView, TodoList, TodoListView, NotFoundView) {
  var Router = Backbone.Router.extend({

    routes: {
      '': 'index',
      'list/:id': 'list',
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

    list: function() {
      var todoList = new TodoList();
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

  return new Router();
})
