Template.commonInterface.onRendered(function() {
  Meteor.setTimeout(function() {
    this.$('.ui.checkbox.pastor').checkbox();
  }, 2000);
});