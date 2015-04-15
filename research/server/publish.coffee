Meteor.publish 'researcher', ->
  if @userId
    return Meteor.users.find { _id: @userId },
      fields:
        'username': 1
        'wisdom': 1
        'guessRiddles': 1
  else
    @ready()
    return