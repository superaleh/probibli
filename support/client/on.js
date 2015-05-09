Template.supportMessages.onRendered(function() {

  var checkbox = this.$('.ui.checkbox.solved');
  checkbox.checkbox();
  var currentSupport = this.data;

  if( currentSupport.solved )
    checkbox.checkbox('check');


  Meteor.setTimeout(function() {

    //если id исследователя не совпадает с id обновляющего обращение поля seen
    if ( currentSupport.seen !== Meteor.userId() )
      Supports.update( { _id: currentSupport._id }, { $set: { seen: "true" } } );

  }, 3000);

});
