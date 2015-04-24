Meteor.publish('riddles', function(episodeId, riddleId) {

  var pastor = Meteor.users.findOne({_id: this.userId}).pastor;

  if (riddleId == null) {
    riddleId = false;
  }

  var fields = {
        episodeId: 1
        ,scopeSearch: 1
        ,question: 1
        ,intricacy: 1
        ,position: 1
        ,versesCount: 1
        ,createdAt: 1
        ,updatedAt: 1
      }

  // если пастор, то добавляю поле публикация 
  if ( pastor )
    _.extend(fields, {publish: 1});

  if (riddleId) {
    return Riddles.find({
      _id: riddleId,
      episodeId: episodeId
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