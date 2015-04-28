Meteor.methods({
  countWordsResponseRiddle: function(riddleId) {

    check(riddleId, String);
    var curentRiddle = Riddles.findOne({
      _id: riddleId
    });

    var wordsResponse = lodash.words( curentRiddle.response, /[а-я\d]+/ig );

    return wordsResponse.length;

  }
  ,nextRiddleId: function(position, episodeId) {
    
    check(episodeId, String);
    check(position, Number);

    var nextRiddle = Riddles.findOne({
      episodeId : episodeId
      ,position : position + 1
    });

    if ( !nextRiddle )
      return false; 

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
    var correctResponse = false;
    var correctVerses = false;


    // очищаю строку ответа
    var response = _.chain(curentRiddle.response).clean().value().toLowerCase();
    //проверяю ответ
    correctResponse = response === userResponse;

    var verses = [];
    // требуются ли стихи для ответа?
    if ( curentRiddle.versesCount === 0) {

      correctVerses = true;

    } else {

      var verses = EJSON.parse( curentRiddle.correctVerses );
      
      //проверяю совпадения стихов
      var correctVerses = 0;
      _.forEach(userVerses, function (userVerse) {
        correctVerses += _.indexOf(verses, userVerse) !== -1 ? 1 : 0;
      });

      // если количство совпадений равно с количеством обязательных стихов то правильно
      if ( correctVerses === curentRiddle.versesCount && userVerses.length === curentRiddle.versesCount )
        correctVerses = true;
      else
        correctVerses = false;
      
    }



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