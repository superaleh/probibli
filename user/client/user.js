Meteor.subscribe('episodes');

Template.user.helpers({
  episodes: function() {
    return Episodes.find();
  },
});