Router.route('/support', {
  name: 'support'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    Meteor.subscribe('researcher');
    Meteor.subscribe('supports');
  }
});

Router.route('/support-:_supportId', {
  name: 'supportMessages'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    Meteor.subscribe('researcher');
    Meteor.subscribe('supportsNotViewed');
    Meteor.subscribe('supports', this.params._supportId);
    Meteor.subscribe('messages', this.params._supportId);
  }
  ,data: function () {
    return Supports.findOne( { _id: this.params._supportId } );
  }
});
