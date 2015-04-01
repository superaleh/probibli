Meteor.publish('riddles', function(episodeId) {
  return Riddles.find({episodeId: episodeId});
});

Meteor.publish('singleEpisode', function(episodeId) {
  return Episodes.find({_id: episodeId});
});