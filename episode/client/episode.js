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

      riddles[0].availability = true;
      return riddles;

    }else{ //иначе если есть хоть одна отгаданная загадка, то делаю ее доступной и следующую после нее
      
      riddles = _.map(riddles, function(riddle, key){
        
        //загадка доступна если она отгадана
        if(_.indexOf(guessRiddlesUser, riddle._id) === -1)
          riddle.availability = false;
        else
          riddle.availability = true;

        return riddle;
      
      });

      riddles[ guessRiddlesUser.length ].availability = true;

      return riddles;

    }

    // availability

  }
  ,idEpisode: function() {
    return this._id;
  }
});