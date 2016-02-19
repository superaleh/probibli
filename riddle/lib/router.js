Router.route('/episode-:_episodeId/riddle-:_riddleId', {
  name: 'riddle'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    return [
      Meteor.subscribe('researcher')
      ,Meteor.subscribe('supportsNotViewed')// подписка тех поддержки
      ,Meteor.subscribe('riddles', this.params._episodeId, this.params._riddleId)
      ,Meteor.subscribe('episodes', this.params._episodeId)
    ];
  }
  ,data: function() {
    return Riddles.findOne(this.params._riddleId);
  }
});
