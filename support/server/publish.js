Meteor.publish('supports', function(supportId) {

  if ( this.userId ) {

    var researcher = Meteor.users.findOne( { _id: this.userId } );

    if ( researcher.pastor ) {
      if (supportId) {
        return Supports.find( { _id:supportId }, { sort: { createdAt: -1 } } );
      } else {
        return Supports.find( {}, { sort: { createdAt: -1 } } );
      }
    } else {
      if (supportId) {
        return Supports.find( { _id:supportId, createdBy: this.userId }, { sort: { createdAt: -1 } } );
      } else {
        return Supports.find( { createdBy: this.userId }, { sort: { createdAt: -1 } });
      }
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

Meteor.publish('messages', function(supportId) {

  if ( this.userId ) {

    return Messages.find( { supportId: supportId }, { sort: { createdAt: 1 } } );

  }

});

Meteor.publish('researcherSupport', function( ressearcherId ) {
  if ( ressearcherId !== 'false' ) {
    return Meteor.users.find({
      _id: ressearcherId
    }, {
      fields: {
        'username': 1
        ,'wisdom': 1
        ,'guessRiddles': 1
        ,'pastor': 1
        ,'profile': 1
        ,'createdAt': 1
        ,'status': 1
      }
    });
  } else {
    return Meteor.users.find({
      pastor: true
    }, {
      fields: {
        'username': 1
        ,'wisdom': 1
        ,'guessRiddles': 1
        ,'pastor': 1
        ,'profile': 1
        ,'createdAt': 1
        ,'status': 1
      }
    });
  }
});
