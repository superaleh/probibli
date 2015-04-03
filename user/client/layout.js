Template.layout.helpers({
  user: function() {
    if(!Meteor.user()) return;
    var userData = Meteor.user();
    if(userData.username)
      return userData.username;
    else
      return userData.emails[0].address;
  }
  ,wisdom: function () {
    return Meteor.user().wisdom;
  }
  ,wisdomAddition: function () {
    if(Session.get('wisdomAddition'))
      Meteor.setTimeout(function () {
        Session.set('wisdomAddition');
      }, 1000);
      return Session.get('wisdomAddition');
    return false;
  }
});

Template.layout.events({
  'click .logout': function(e) {
    e.preventDefault();
    Meteor.logout();
  }
});