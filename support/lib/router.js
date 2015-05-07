Router.route('/support', {
  name: 'support'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    Meteor.subscribe('researcher');
    Meteor.subscribe('supports');
    Meteor.subscribe('messages');
  }
});
