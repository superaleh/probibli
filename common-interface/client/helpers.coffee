Template.commonInterface.helpers
  researcher: ->
    if !Meteor.user()
      return
    researcher = Meteor.user()
    researcher
  wisdom: ->
    Meteor.user().wisdom
  wisdomAddition: ->
    if Session.get('wisdomAddition')
      Meteor.setTimeout (->
        Session.set 'wisdomAddition'
        return
      ), 1300
      return Session.get('wisdomAddition')