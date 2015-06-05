Router.route('/research', {
  name: 'research'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    return [
      Meteor.subscribe('researcher')
      ,Meteor.subscribe('supportsNotViewed')
      ,Meteor.subscribe('guessRiddles')
      ,Meteor.subscribe('researchersBest')
      ,Meteor.subscribe('episodes')
      ,Meteor.subscribe('statistics')
    ];
  }
});
