Template.researchersBest.helpers({
  researchersBest: function() {
    var researchersBest;
    return researchersBest = Meteor.users.find({}, {
      sort: {
        wisdom: -1
        ,createdAt: 1
      },
      limit: 12
    });
  }
  ,guessRiddlesCount: function () {
    var guessRiddles = this.guessRiddles;
    return guessRiddles.length;
  }
  ,registerDate: function () {
    var createdAt = this.createdAt;
    if ( createdAt )
      return moment( createdAt ).fromNow();
  }
  ,lastLoginDate: function () {
    if ( this.status.lastLogin ) {
      var lastLoginDate = this.status.lastLogin.date;
      return moment( lastLoginDate ).fromNow();
    }
  }
});
