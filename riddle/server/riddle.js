Meteor.publish('singleRiddle', function(idRiddle) {
  check(idRiddle, String);
  return Riddles.find({_id: idRiddle});
});