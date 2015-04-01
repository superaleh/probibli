Meteor.publish('episodes', function() {
  return Episodes.find();
});

Meteor.publish('riddlesCountByEpisod', function() {
  return Riddles.find();
});