Router.configure
  loadingTemplate : 'loading'
  progressSpinner : false

Router.onBeforeAction ->
  if !Meteor.userId()
    Router.go 'starting'
    @next()
  else
    @next()