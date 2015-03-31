Meteor.publish('riddles', function() {
  return Riddles.find();
});