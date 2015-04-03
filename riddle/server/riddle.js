Meteor.publish('riddles', function(episodeId) {
  return Riddles.find(
    {episodeId: episodeId}
    , {fields: {
        response: 0
        , falseResponse: 0
        , versesResponse: 0
        }
      }
  );
});

Meteor.publish('singleRiddle', function(idRiddle) {

  check(idRiddle, String);

  return Riddles.find(
    {_id: idRiddle}
    , {fields: {
        response: 0
        , falseResponse: 0
        , versesResponse: 0
        }
      }
  );

});

Meteor.methods({
  checkAnswer: function (userResponse, idRiddle) {

    check(userResponse, String);
    check(idRiddle, String);

    
    var curentRiddle = Riddles.findOne({_id: idRiddle});

    var response = _.chain(curentRiddle.response).clean().value().toLowerCase();
    var verses = curentRiddle.versesResponse.replace(/ /gi, '').replace(/:/gi, '').replace(/;/gi, '');

    var correctResponse = response + verses;
    
    if(correctResponse === userResponse) {

      var riddleWisdom = curentRiddle.intricacy;
      Meteor.users.update({_id:Meteor.userId()}, {$inc: {wisdom: riddleWisdom}});

      var guessRiddlesUser = GuessRiddles.findOne(
        {
          episodeId: curentRiddle.episodeId
          ,userId: this.userId
        }
      );

      if(!guessRiddlesUser){

        GuessRiddles.insert(
          {
            episodeId: curentRiddle.episodeId
            ,userId: this.userId
            ,guessRiddles: [curentRiddle._id]
          }
        );

      }else{

        GuessRiddles.update(
            {
              episodeId: curentRiddle.episodeId
              ,userId: this.userId
            }
            ,{
              $addToSet: {guessRiddles: curentRiddle._id}
            }
          );

      }
      
      return riddleWisdom;

    }
    
    return false;

  }
})