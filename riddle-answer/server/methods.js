Meteor.methods({
  countWordsResponseRiddle: function(riddleId) {

    check(riddleId, String);
    var curentRiddle = Riddles.findOne({
      _id: riddleId
    });

    var wordsResponse = lodash.words( curentRiddle.response, /[а-яА-Я]+/g );

    return wordsResponse.length;

  }
  ,nextRiddleId: function(position, episodeId) {
    
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

    if ( /^\d+$/.test( curentRiddle.response ) ) {
      responseType.number = true;
      return responseType;
    }

    if (typeof curentRiddle.response === 'string') {
      if (!curentRiddle.falseResponse) {
        responseType.string = true;
      } else {
        responseType.options = true;
        responseType.options = _.chain(curentRiddle.falseResponse.split(',')).map(function(value) {
          return lodash.trim(value);
        }).value();
        responseType.options.push(curentRiddle.response);
        responseType.options = _.shuffle(responseType.options);
      }
    }

    return responseType;
  }
  ,checkAnswer: function(userResponse, userVerses, riddleId, pastorMode) {

    check(userResponse, String);
    check(userVerses, Array);
    check(riddleId, String);
    check(pastorMode, Boolean);

    var curentRiddle = Riddles.findOne({
      _id: riddleId
    });

    // очищаю строку ответа
    var response = _.chain(curentRiddle.response).clean().value().toLowerCase();
    var verses = [];
    // требуются ли стихи для ответа?
    if( curentRiddle.versesCount !== 0 && curentRiddle.versesResponse )
      var verses = EJSON.parse( curentRiddle.versesResponse );

    //проверяю ответ
    var correctResponse = response === userResponse;

    //проверяю стихи
    var correctVerses = 0;
    _.forEach(userVerses, function (userVerse) {
      correctVerses += _.indexOf(verses, userVerse) !== -1 ? 1 : 0;
    });

    if (
          verses.length === 0 ||
         (correctVerses === curentRiddle.versesCount && userVerses.length === curentRiddle.versesCount)
        )
      correctVerses = true;
    else
      correctVerses = false;

    if ( correctResponse && correctVerses ) {

      var riddleWisdom = 0;

      if (pastorMode)
        return riddleWisdom;

      var guessRiddlesResearcher = Meteor.user().guessRiddles;
      var currentGuessRiddlesResearcher = _.where(guessRiddlesResearcher, { riddleId: curentRiddle._id });

      if (currentGuessRiddlesResearcher.length === 0) {

        riddleWisdom = curentRiddle.intricacy;

        Meteor.users.update(
           { _id: Meteor.userId() }
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