Template.researchersBest.helpers
  researchersBest: ->
    researchersBest = Meteor.users.find({},
      sort: wisdom: -1
      limit: 4)