Router.route '/episode-:_episodeId/riddle-:_id',
  name: 'riddle'
  layoutTemplate: 'commonInterface'
  waitOn: ->
    [
      Meteor.subscribe('researcher')
      Meteor.subscribe('riddles', @params._episodeId, @params._id)
      Meteor.subscribe('episodes', @params._episodeId)
    ]
  data: ->
    Riddles.findOne @params._id