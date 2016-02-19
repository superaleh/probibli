Template.researchersBest.helpers({
  researchersBest: function() {
    var researchersBest;
    researchersBest = Meteor.users.find({}, {
      sort: {
        wisdom: -1
        ,createdAt: 1
      },
      limit: 12
    });
    var output = [];
    researchersBest.forEach(function(researcher, i) {
      if ( i <= 3 ) researcher.range = "yellow";
      if ( i > 3 && i < 8 ) researcher.range = "orange";
      if ( i > 7 && i < 10 ) researcher.range = "brown";
   //   else researcher.range = "red";
      output.push(researcher);
    });
    return output;
  }
});
