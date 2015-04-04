Template.user.helpers({
  episodes: function() {
    return Episodes.find();
  }
});

Template.episodeItem.helpers({
  riddlesCount: function() {
    return Riddles.find({episodeId: this._id}).count();
  }
});

Template.usersBest.helpers({
  users: function() {
    var users = Meteor.users.find().fetch();
    users = _.map(users, function(value, key){
    
      value.place = ++key;

      return value;
    
    });
    return users;
  }
});