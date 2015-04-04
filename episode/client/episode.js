Template.episode.helpers({
  riddles: function() {

    var riddles = Riddles.find({}, {sort: {idBz: 1}}).fetch();

    var guessRiddlesUser = GuessRiddles.findOne(
      {
        episodeId: this._id
        ,userId: Meteor.userId()
      }
    );

    guessRiddlesUser = guessRiddlesUser ? guessRiddlesUser.guessRiddles : false;

    if(!guessRiddlesUser) { //если нет не одной отгаданной загадки то доступна только первая загадка

      riddles[0].availability = true; //доступная загадка
      riddles[0].next = true; //следующая загадка
      return riddles;

    }else{ //иначе если есть хоть одна отгаданная загадка, то делаю ее доступной и следующую после нее
      
      riddles = _.map(riddles, function(riddle, key){
        
        //загадка доступна если она отгадана
        if(_.indexOf(guessRiddlesUser, riddle._id) !== -1)
          riddle.availability = true; //доступная загадка
        else
          riddle.availability = false; //НЕдоступная загадка

        return riddle;
      
      });

      riddles[ guessRiddlesUser.length ].availability = true; //доступная загадка
      riddles[ guessRiddlesUser.length ].next = true; //следующая загадка

      return riddles;

    }

  }
  ,idEpisode: function() {
    return this._id;
  }
});