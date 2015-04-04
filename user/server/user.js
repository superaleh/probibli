Meteor.publish('episodes', function() {
  return Episodes.find();
});

Meteor.publish('riddlesCountByEpisod', function() {
  return Riddles.find();
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}
                             ,{fields: {'wisdom': 1}});
  } else {
    this.ready();
  }
});

Meteor.publish('usersBest', function() {
  return Meteor.users.find({}, { fields: {'username': 1, 'wisdom': 1}, sort: {wisdom: -1}, limit: 4 } );
});