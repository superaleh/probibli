Template.pastorCheckbox.events({

  'change .checkbox.pastor' : function(e, template) {

    var pastorChecked = $(e.currentTarget).checkbox('is checked');
    var userPastor = Meteor.user().pastor;

    if (userPastor){
      if(pastorChecked)
        Session.set('pastorMode', true);
      else
        Session.set('pastorMode', false);
    }

  }

})

Template.commonInterface.events({
  'mouseenter .heart-block' : function(e, template) {

    var shape = $(e.target).find('.heart-transition .shape');

    shape.shape({duration: 300});
    shape.shape('flip up');

  }
  ,'mouseleave .heart-block' : function(e, template) {

    var shape = $(e.target).find('.heart-transition .shape');

    shape.shape({duration: 600});
    shape.shape('flip down');

  }
  ,'click .researcher-exit' : function(e, template) {

    e.preventDefault();
    Meteor.logout();

  }
});
