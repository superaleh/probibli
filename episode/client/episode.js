Template.episode.helpers({
  riddles: function() {
    return Riddles.find();
  }
  ,idEpisode: function() {
    return this._id;
  }
});

Template.riddleItem.helpers({
  availability: function() {
    if( this.intricacy === 1)
      return true;
    return false;
  }
});