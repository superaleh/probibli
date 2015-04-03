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

Meteor.publish('singleRiddle', function(riddleId) {

  check(riddleId, String);

  return Riddles.find(
    {_id: riddleId}
    , {fields: {
        response: 0
        , falseResponse: 0
        , versesResponse: 0
        }
      }
  );

});

Meteor.methods({
  responseOptions: function (riddleId) {

    var curentRiddle = Riddles.findOne({_id: riddleId});

    var responseOptionsArray = false;

    if(curentRiddle.falseResponse){

      responseOptionsArray = 
        _.chain(curentRiddle.falseResponse.split(','))
        .map(function(value){ return _.trim(value) }).value();

      responseOptionsArray.push(curentRiddle.response);
      
      responseOptionsArray = _.shuffle(responseOptionsArray);

    }

    return responseOptionsArray;
  }
  ,checkAnswer: function (userResponse, riddleId) {

    check(userResponse, String);
    check(riddleId, String);

    
    var curentRiddle = Riddles.findOne({_id: riddleId});
    var riddlesCurentEpisode = Riddles.find({ episodeId : curentRiddle.episodeId }, {sort: {idBz: 1}}).fetch();
    riddlesCurentEpisode = _.pluck(riddlesCurentEpisode, '_id');

    var response = _.chain( curentRiddle.response ).clean().value().toLowerCase();
    var verses = curentRiddle.versesResponse.replace(/ /gi, '').replace(/:/gi, '').replace(/;/gi, '');

    var correctResponse = response + verses;
    
    if(correctResponse === userResponse) {

      var indexRiddle = _.indexOf( riddlesCurentEpisode, curentRiddle._id );

      var nextRiddle = riddlesCurentEpisode[ indexRiddle + 1 ];

      var guessRiddlesUser = GuessRiddles.findOne(
        {
          episodeId: curentRiddle.episodeId
          ,userId: this.userId
        }
      );

      var riddleWisdom = 0;

      if(!guessRiddlesUser){ //Если еще не создана запись с отгаданными загадками, то создать ее.

        GuessRiddles.insert(
          {
            episodeId: curentRiddle.episodeId
            ,userId: this.userId
            ,guessRiddles: [curentRiddle._id]
          }
        );

        riddleWisdom = curentRiddle.intricacy;

      }else{ //Иначе добавить id отгаданной загадки в массив

        if(_.indexOf( guessRiddlesUser.guessRiddles, curentRiddle._id ) === -1)
          riddleWisdom = curentRiddle.intricacy;

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
      
      Meteor.users.update({_id:Meteor.userId()}, {$inc: {wisdom: riddleWisdom}});

      return { wisdom: riddleWisdom, next: nextRiddle };

    }
    
    return false;

  }
})