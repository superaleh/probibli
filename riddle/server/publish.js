Meteor.publish('riddles', function(episodeId, riddleId) {


  if (riddleId == null) {
    riddleId = false;
  }

  var fields = {
        episodeId: 1
        ,scopeSearch: 1
        ,question: 1
        ,help: 1
        ,intricacy: 1
        ,position: 1
        ,versesCount: 1
        ,createdAt: 1
        ,updatedAt: 1
      }

  // если пастор, то добавляю закрытые поля
  if (this.userId) {

    var pastor = Meteor.users.findOne({_id: this.userId}).pastor;
    if ( pastor ){

      _.extend(fields, {
        smartInput: 1
        ,response: 1
        ,falseResponse: 1
        ,correctVerses: 1
      });

    }

  }

  if (riddleId) {
    return Riddles.find({
      _id: riddleId,
    }, {
      fields: fields
    });
  } else {
    return Riddles.find({
      episodeId: episodeId
    }, {
      fields: fields
    });
  }
});
