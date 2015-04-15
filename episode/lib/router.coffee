Router.route '/episode-:_id',
  name: 'episode'
  layoutTemplate: 'commonInterface'
  waitOn: ->
    [
      Meteor.subscribe('researcher')
      Meteor.subscribe('episodes', @params._id)
      Meteor.subscribe('riddles', @params._id)
    ]
  data: ->
    Episodes.findOne @params._id