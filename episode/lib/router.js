Router.route('/episode-:_episodeId', {
  name: 'episode'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    return [
      Meteor.subscribe('researcher')
      ,Meteor.subscribe('supportsNotViewed')
      ,Meteor.subscribe('guessRiddles')
      ,Meteor.subscribe('episodes', this.params._episodeId)
      ,Meteor.subscribe('riddles', this.params._episodeId)
    ];
  }
  ,data: function() {
    return Episodes.findOne(this.params._episodeId);
  }
});
