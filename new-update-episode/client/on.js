Template.autoForm.onRendered(function() {
  
  var checkbox = this.$('.ui.checkbox');

  checkbox.addClass('toggle');
  checkbox.checkbox();

  var disabled = this.$('input[disabled]');
  disabled.parent().addClass('disabled');
  
});