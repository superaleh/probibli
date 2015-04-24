Router.route('/episode-:_episodeId/new-riddle', {
  name: 'newRiddle'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    return [
      Meteor.subscribe('researcher')
      ,Meteor.subscribe('episodes', this.params._episodeId)
    ];
  }
  ,data: function() {
    return Episodes.findOne(this.params._episodeId);
  }
});

Router.route('/episode-:_episodeId/riddle-:_riddleId/edit', {
  name: 'editRiddle'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    return [
      Meteor.subscribe('researcher')
      ,Meteor.subscribe('riddles', this.params._episodeId, this.params._riddleId)
      ,Meteor.subscribe('episodes', this.params._episodeId)
    ];
  }
  ,data: function() {
    return Riddles.findOne(this.params._riddleId);
  }
});