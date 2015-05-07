Template.commonInterface.helpers({
  researcher: function() {
    var researcher;
    if (!Meteor.user()) {
      return;
    }
    researcher = Meteor.user();
    return researcher;
  }
  ,wisdomNumber: function() {
    var user;
    user = Meteor.user();
    if (user) {
      return user.wisdom;
    }
  }
  ,episodeTitle: function() {
    var episode;
    episode = Episodes.findOne();
    if (episode) {
      return episode.title;
    }
  }
  ,episodeId: function() {
    var episode;
    episode = Episodes.findOne();
    if (episode) {
      return episode._id;
    }
  }
  ,supportsNotViewed: function () {
    return Supports.find( { viewed: false } ).count();
  }
});
