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

    check(position, Number);
    check(episodeId, String);

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
    var currentResearcherId = Meteor.userId()
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


    // если ответ и стихи правильные то начисляю мудрость
    if ( correctResponse && correctVerses ) {

      var riddleWisdom = 0;

      // в режиме пастора мудрость не начисляю
      if (pastorMode)
        return riddleWisdom;

      var guessRiddleResearcher = GuessRiddles.findOne(
        {
          researcherId: currentResearcherId
          ,riddleId: riddleId
        }
      );

      // если загадка ни разу не отгадывалась то начисляю мудрость и добавляю ее в отгаданные
      if ( !guessRiddleResearcher ) {

        riddleWisdom = curentRiddle.intricacy;

        Meteor.users.update(
           { _id: currentResearcherId }
           ,{ $inc: { wisdom:  riddleWisdom, guessRiddles: 1 } }
        );

        GuessRiddles.insert({
          episodeId: curentRiddle.episodeId
          ,riddleId: curentRiddle._id
          ,sins: 0
        })

      };

      // если загадка отгадана и помечена за грех то добовляю мудрость и отнимаю грех
      if ( !!guessRiddleResearcher && guessRiddleResearcher.sins === 1 ) {

        riddleWisdom = curentRiddle.intricacy;

        Meteor.users.update(
           { _id: currentResearcherId }
           ,{ $inc: { wisdom:  riddleWisdom, guessRiddles: 1, sins: -1 } }
        );

        GuessRiddles.update(
          { _id: guessRiddleResearcher._id }
          ,{ $inc: { sins: -1 }, $set: { researcherId: currentResearcherId } }
        )

      };

      return riddleWisdom;
    }

    return false;
  }
});
