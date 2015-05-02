Router.route('/support-:_researcherId', {
  name: 'support'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    Meteor.subscribe('researcher');
    Meteor.subscribe('support', this.params._researcherId);
  }
});
