Router.route '/research',
  name: 'research'
  layoutTemplate: 'commonInterface'
  waitOn: ->
    [
      Meteor.subscribe('researcher')
      Meteor.subscribe('episodes')
      Meteor.subscribe('researchersBest')
    ]