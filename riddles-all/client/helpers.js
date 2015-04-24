Template.riddlesAll.helpers({
  scopeSearch: function () {

    if( !this.scopeSearch ) return;
    var scopeSearchArray = EJSON.parse( this.scopeSearch );
    return scopeSearchArray.join(', ');
    
  }
  ,riddles: function() {

    var riddles = Riddles.find({}, {
      sort: {
        position: 1
      }
    }).fetch();

    if( riddles.length === 0 ) return;

    if(!Meteor.user()) return riddles;
    
    var guessRiddlesResearcher = Meteor.user().guessRiddles;
    var episodeId = this._id;
    guessRiddlesResearcher = _.where(guessRiddlesResearcher, { episodeId: episodeId });

    /*
    #если нет не одной отгаданной загадки то доступна только первая загадка
     */
    if (guessRiddlesResearcher.length === 0) {
      /*
      #следующая загадка
       */
      riddles[0].next = true;
    } else {
      /*
      #иначе если есть хоть одна отгаданная загадка, то делаю ее доступной и следующую после нее
       */
      guessRiddlesResearcher = _.pluck(guessRiddlesResearcher, 'riddleId');
      var guessRiddleResearcherLastId = guessRiddlesResearcher[guessRiddlesResearcher.length - 1];

      // если в эпизоде отгаданы все загадки то делаю их все доступными
      if ( riddles.length === guessRiddlesResearcher.length ) {

        riddles = _.map(riddles, function(riddle) {

          riddle.availability = true;
          riddle.next = false;
          return riddle;
          
        });

        return riddles;

      }

      riddles = _.map(riddles, function(riddle) {
        riddle.availability = false;
        /*
        #загадка доступна если она отгадана
         */
        if (_.indexOf(guessRiddlesResearcher, riddle._id) !== -1){
          
          riddle.availability = true;
          /*
          #следующая загадка
           */
          if (riddle._id === guessRiddleResearcherLastId)            
            riddles[riddle.position].next = true;

        }

        return riddle;
      });

    }

    return riddles;
  }
});