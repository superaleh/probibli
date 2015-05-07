Meteor.publish('supports', function() {

  if ( this.userId ) {

    var researcher = Meteor.users.findOne( { _id: this.userId } );

    if ( researcher.pastor ) {
      return Supports.find( {}, { createdAt: -1 } );
    } else {
      return Supports.find( { createdBy: this.userId }, { createdAt: -1 } );
    }

  }

});

Meteor.publish('supportsNotViewed', function() {

  if ( this.userId ) {

    var researcher = Meteor.users.findOne( { _id: this.userId } );

    if ( researcher.pastor ) {
      return Supports.find( { viewed: false } );
    } else {
      return Supports.find( { createdBy: this.userId, viewed: false } );
    }

  }

});

Meteor.publish('messages', function() {

  if ( this.userId ) {

    var researcher = Meteor.users.findOne( { _id: this.userId } );

    if ( researcher.pastor ) {
      return Messages.find( {}, { createdAt: -1 } );
    } else {
      return Messages.find( { createdBy: this.userId }, { createdAt: -1 } );
    }

  }

});
