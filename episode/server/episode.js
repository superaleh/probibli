Meteor.publish('singleEpisode', function(episodeId) {
  return Episodes.find({_id: episodeId});
});