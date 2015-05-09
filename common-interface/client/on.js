Template.pastorCheckbox.onRendered(function() {

  var checkbox = this.$('.ui.checkbox.pastor');
  checkbox.checkbox();

  if(Session.get('pastorMode'))
    checkbox.checkbox('check');

});
