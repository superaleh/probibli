Template.layout.helpers({
  user: function() {
    if(!Meteor.user()) return;
    var userData = Meteor.user();
    if(userData.username)
      return userData.username;
    else
      return userData.emails[0].address;
  }
});

Template.layout.events({
  'click .logout': function(e) {
    e.preventDefault();
    Meteor.logout();
  }
});