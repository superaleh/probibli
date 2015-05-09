Messages.after.insert(function (userId, doc) {

  // !!! не понимаю, но обычный инкремент не работает, выдает ошибку
  // update failed: MongoError: '$set' is empty. You must specify a field like so: {$mod: {<field>: ...}}

  var currentSupport = Supports.findOne( { _id: doc.supportId} )

  if ( currentSupport && currentSupport.messageCount ) {

    Supports.update(
      { _id: doc.supportId }
      ,{ $set: { seen: userId }
        ,$inc: { messageCount: 1 }
      }
    );

  }

});
