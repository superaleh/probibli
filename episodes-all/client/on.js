Template.episodesAll.onRendered(function() {
  Meteor.setTimeout(function() {
    this.$('.progress').progress();
  }, 500);
});