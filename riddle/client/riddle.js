Meteor.subscribe('riddles');

Template.riddles.helpers({
  riddles: function() {
    return Riddles.find();
  }
});