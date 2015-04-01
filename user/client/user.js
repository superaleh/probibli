Template.user.helpers({
  episodes: function() {
    return Episodes.find();
  }
});

Template.episodeItem.helpers({
  riddlesCount: function() {
    return Riddles.find({episodeId: this._id}).count();
  }
});