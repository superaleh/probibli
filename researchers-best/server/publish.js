Meteor.publish('researchersBest', function() {
  return Meteor.users.find({}, {
    fields: {
      'username': 1
      ,'wisdom': 1
      ,'createdAt': 1
      ,'guessRiddles': 1
      ,'profile': 1
      ,'status': 1
    },
    sort: {
      wisdom: -1
      ,createdAt: 1
    },
    limit: 12
  });
});
