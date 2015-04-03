Router.configure({
  loadingTemplate: 'loading'
})


Router.route('/', {
  name: 'anonymous'
  ,onBeforeAction: function () {
    if (Meteor.userId()) {
      Router.go('user');
    } else {
      this.next();
    }
  }
});

Router.route('/user', {
  name: 'user'
  ,layoutTemplate: 'layout'
  ,waitOn: function() {
      return [
        Meteor.subscribe('episodes')
        ,Meteor.subscribe('riddlesCountByEpisod')
        ,Meteor.subscribe('userData')
      ]
  }
});

Router.route('/episode-:_id', {
  name: 'episode'
  ,layoutTemplate: 'layout'
  ,waitOn: function() {
      return [
        Meteor.subscribe('riddles', this.params._id)
        ,Meteor.subscribe('singleEpisode', this.params._id)
        ,Meteor.subscribe('userData')
        ,Meteor.subscribe('guessRiddles')
      ]
  }
  ,data: function() { return Episodes.findOne(this.params._id); }
});

Router.route('/episode-:_episodeId/riddle-:_id', {
  name: 'riddle'
  ,layoutTemplate: 'layout'
  ,waitOn: function() {
      return [
        Meteor.subscribe('singleRiddle', this.params._id)
        ,Meteor.subscribe('singleEpisode', this.params._episodeId)
        ,Meteor.subscribe('userData')
        ,Meteor.subscribe('guessRiddles')
      ]
  }
  ,data: function() { return Riddles.findOne(this.params._id); }
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('anonymous');
  } else {
    this.next();
  }
});