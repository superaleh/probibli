Meteor.publish('support', function(researcherId) {

  check(researcherId, String);

  var researcher = Meteor.users.findOne( { _id: researcherId } );

  if ( !researcher ) return false;

  if ( researcher.pastor ) {
    return Support.find( {}, { createdAt: -1 } );
  } else {
    return Support.find( { createdBy: researcherId }, { createdAt: -1 } );
  }

});
