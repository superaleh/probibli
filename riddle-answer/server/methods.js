Meteor.methods({
  nextRiddleId: function(position, episodeId) {
    
    check(episodeId, String);
    check(position, Number);

    var nextRiddle = Riddles.findOne({
      episodeId : episodeId
      ,position : position + 1
    });

    return nextRiddle._id;

  }
  ,responseType: function(riddleId) {

    check(riddleId, String);

    var curentRiddle = Riddles.findOne({
      _id: riddleId
    });

    var responseType = {
      number: false
      ,string: false
      ,options: false
    };

    if (typeof curentRiddle.response === 'number') {
      responseType.number = true;
    }

    if (typeof curentRiddle.response === 'string') {
      if (!curentRiddle.falseResponse) {
        responseType.string = true;
      } else {
        responseType.options = true;
        responseType.options = _.chain(curentRiddle.falseResponse.split(',')).map(function(value) {
          return _.trim(value);
        }).value();
        responseType.options.push(curentRiddle.response);
        responseType.options = _.shuffle(responseType.options);
      }
    }

    return responseType;
  }
  ,checkAnswer: function(userResponse, riddleId) {

    check(userResponse, String);
    check(riddleId, String);

    var curentRiddle = Riddles.findOne({
      _id: riddleId
    });

    var response = _.chain(curentRiddle.response).clean().value().toLowerCase();
    var verses = curentRiddle.versesResponse
      .replace(RegExp(' ', 'gi'), '')
      .replace(/:/gi, '')
      .replace(/;/gi, '')
      .replace(/,/gi, '')
    ;
    var correctResponse = response + verses;

    if (correctResponse === userResponse) {

      var guessRiddlesResearcher = Meteor.user().guessRiddles;
      var currentGuessRiddlesResearcher = _.where(guessRiddlesResearcher, { riddleId: curentRiddle._id });

      var riddleWisdom = 0;


      if (currentGuessRiddlesResearcher.length === 0) {

        riddleWisdom = curentRiddle.intricacy;

        var temp = Meteor.users.update(
           { _id: Meteor.userId }
           ,{ $push: { guessRiddles: {episodeId: curentRiddle.episodeId, riddleId: curentRiddle._id} }
              ,$inc: { wisdom:  riddleWisdom }
            }
        );

      };

      return riddleWisdom;
    }
    
    return false;
  }
});