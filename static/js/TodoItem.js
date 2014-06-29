define(['backbone'], function(Backbone) {
    var Todo = Backbone.Model.extend({
        defaults: function() {
          return {
            title: 'nothing todo',
            done: false
          };
        },

        toggleDone: function() {
          this.save({done: !this.get('done')});
        }
    });

    return Todo;
})
