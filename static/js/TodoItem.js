define(['backbone'], function(Backbone) {
  return Backbone.Model.extend({
    defaults: function() {
      return {
        title: 'nothing todo',
        done: false
      };
    },

    toggleDone: function() {
      this.save({done: !this.get('done')});
    },

    setPosition: function(pos) {
      Backbone.ajax({
        url: this.url() + '?position=' + pos,
        type: 'PUT'
      })
    },
  });
});
