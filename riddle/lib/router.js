Router.route('/episode-:_episodeId/riddle-:_id', {
  name: 'riddle'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    return [Meteor.subscribe('researcher'), Meteor.subscribe('riddles', this.params._episodeId, this.params._id), Meteor.subscribe('episodes', this.params._episodeId)];
  }
  ,data: function() {
    return Riddles.findOne(this.params._id);
  }
});