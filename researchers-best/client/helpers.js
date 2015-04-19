Template.researchersBest.helpers({
  researchersBest: function() {
    var researchersBest;
    return researchersBest = Meteor.users.find({}, {
      sort: {
        wisdom: -1
        ,createdAt: -1
      },
      limit: 4
    });
  }
});