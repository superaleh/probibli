Meteor.publish('episodes', function(episodeId) {
  if (episodeId) {
    return Episodes.find({
      _id: episodeId
    });
  } else {
    return Episodes.find();
  }
});