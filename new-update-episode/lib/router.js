Router.route('/new-episode', {
  name: 'newEpisode'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    return [
      Meteor.subscribe('researcher')
      ,Meteor.subscribe('supportsNotViewed')
      ];
  }
});

Router.route('/episode-:_episodeId/edit', {
  name: 'editEpisode'
  ,layoutTemplate: 'commonInterface'
  ,waitOn: function() {
    return [
      Meteor.subscribe('researcher')
      ,Meteor.subscribe('supportsNotViewed')
      ,Meteor.subscribe('episodes', this.params._episodeId)
      ];
  }
  ,data: function() {
    return Episodes.findOne(this.params._episodeId);
  }
});
