Meteor.methods({
  responseType: function(riddleId) {

    var curentRiddle, responseType;

    curentRiddle = Riddles.findOne({
      _id: riddleId
    });

    responseType = {
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
    var correctResponse, curentRiddle, guessRiddlesUser, indexRiddle, nextRiddle, response, riddleWisdom, verses;

    check(userResponse, String);
    check(riddleId, String);

    curentRiddle = Riddles.findOne({
      _id: riddleId
    });

    response = _.chain(curentRiddle.response).clean().value().toLowerCase();
    verses = curentRiddle.versesResponse
      .replace(RegExp(' ', 'gi'), '')
      .replace(/:/gi, '')
      .replace(/;/gi, '')
      .replace(/,/gi, '')
    ;
    correctResponse = response + verses;

    if (correctResponse === userResponse) {

      guessRiddlesUser = Meteor.user().guessRiddles;

      riddleWisdom = 0;

      if (_.indexOf(guessRiddlesUser, riddleId) === -1) {

        riddleWisdom = curentRiddle.intricacy;

        Meteor.users.update(
           { _id: Meteor.userId }
           ,{ $addToSet: { guessRiddles:  riddleId } }
        );

        Meteor.users.update(
           { _id: Meteor.userId }
           ,{ $inc: { wisdom:  riddleWisdom } }
        );

      };

      return true;
    }
    
    return false;
  }
});