Template.commonInterface.onRendered(function() {
  Meteor.setTimeout(function() {
    var checkbox = this.$('.ui.checkbox.pastor');

    checkbox.checkbox();

    if(Session.get('pastorMode'))
      checkbox.checkbox('check');

  }, 2000);
});