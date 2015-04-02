Template.episode.helpers({
  riddles: function() {
    return Riddles.find();
  }
  ,idEpisode: function() {
    return this._id;
  }
});

Template.episode.events({
  'click .choose-riddle': function (e, template) {
    var placeBible = $(e.target).data('placeBible');
    Session.set('placeBible', placeBible);
  }
})