Router.route('/', {
  name: 'starting'
  ,layoutTemplate: 'commonInterface'
  ,onBeforeAction: function() {
    if (Meteor.userId()) {
      return Router.go('research');
    } else {
      return this.next();
    }
  }
  ,waitOn: function() {
    return [
      Meteor.subscribe('researchersBest')
      ,Meteor.subscribe('statistics')
    ];
  }
});
