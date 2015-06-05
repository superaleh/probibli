Router.route('/development', {
  name: 'development'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    return [
      Meteor.subscribe('researcher')
      ,Meteor.subscribe('supportsNotViewed')
    ];
  }
});
