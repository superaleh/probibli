Router.route '/',
  name: 'starting'
  onBeforeAction: ->
    if Meteor.userId()
      Router.go 'research'
    else
      @next()
  waitOn: ->
    [ Meteor.subscribe('researchersBest') ]