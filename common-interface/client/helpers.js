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
    return false;
  }
  ,sins: function() {
    var user;
    user = Meteor.user();
    if (user && user.sins) {
      Tinycon.setBubble(user.sins);
      return user.sins;
    }
    Tinycon.reset;
    return false;
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
    var supports = Supports.find( {
      $and: [
        { seen: { $ne: Meteor.userId() } }
        ,{ seen: { $ne: "true" } }
      ]
    } );
    return supports.count();
  }
});
