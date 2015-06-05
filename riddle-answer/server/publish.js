Meteor.publish('guessRiddles', function() {
  if (this.userId) {
    return GuessRiddles.find({
      researcherId: this.userId
    });
  } else {
    this.ready();
  }
});
