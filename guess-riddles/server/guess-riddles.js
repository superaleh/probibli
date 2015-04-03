Meteor.publish('guessRiddles', function() {
  return GuessRiddles.find({userId: this.userId});
});