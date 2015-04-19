Router.route '/research',
  name: 'research'
  layoutTemplate: 'commonInterface'
  waitOn: ->
    [
      Meteor.subscribe('researchersBest')
      Meteor.subscribe('researcher')
      Meteor.subscribe('episodes')
    ]