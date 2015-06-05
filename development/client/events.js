Template.development.events({
  'click a': function (e) {
    e.preventDefault();
    Meteor.call('transferGuessRiddles');
  }
});
