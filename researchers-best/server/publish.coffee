Meteor.publish 'researchersBest', ->
  Meteor.users.find {},
    fields:
      'username': 1
      'wisdom': 1
    sort: wisdom: -1
    limit: 4
