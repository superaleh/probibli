Meteor.publish('statistics', function() {
  Counts.publish(this, 'researchers', Meteor.users.find());
  Counts.publish(this, 'researchersOnline', Meteor.users.find({ "status.online": true }));
  Counts.publish(this, 'episodes', Episodes.find());
  Counts.publish(this, 'riddles', Riddles.find());
  Counts.publish(this, 'guessRiddles',  GuessRiddles.find());

});
