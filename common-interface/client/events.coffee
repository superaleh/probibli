Template.commonInterface.events
  'click .researcher-exit' : (e, template) ->
    e.preventDefault()
    Meteor.logout()