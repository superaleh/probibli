Template.layout.helpers({
  user: function() {
    return Meteor.user();
  }
});

Template.layout.events({
  'click .logout': function(e) {
    e.preventDefault();
    Meteor.logout();
  }
});