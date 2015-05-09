Template.supportMessages.events({

  'change .checkbox.solved' : function(e, template) {

    var solvedChecked = $(e.currentTarget).checkbox('is checked');

    if( solvedChecked ){

      Supports.update(
        { _id: this._id }
        ,{ $set: { solved: true} }
      );

    } else {

      Supports.update(
        { _id: this._id }
        ,{ $set: { solved: false} }
      );

    }

  }

})
