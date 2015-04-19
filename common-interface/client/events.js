Template.commonInterface.events({
  'click .researcher-exit': function(e, template) {
    e.preventDefault();
    Meteor.logout();
  }
  ,'click .checkbox.pastor': function(e, template) {
    var pastorChecked = $(e.target).parent().checkbox('is checked');
    var userPastor = Meteor.user().pastor;

    if (userPastor){
      if(pastorChecked)
        Session.set('pastorMode', true);
      else
        Session.set('pastorMode', false);
    }

  }
});