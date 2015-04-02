Template.episode.helpers({
  riddles: function() {
    return Riddles.find();
  }
  ,idEpisode: function() {
    return this._id;
  }
});