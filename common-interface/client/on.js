Template.pastorCheckbox.onRendered(function() {

  var checkbox = this.$('.ui.checkbox.pastor');
  checkbox.addClass('toggle').checkbox();

  if(Session.get('pastorMode'))
    checkbox.checkbox('check');

});