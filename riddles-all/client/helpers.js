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
    });

    return riddles;
  }
  ,guess: function () {
    if(!Meteor.user()) return;

    var guessRiddlesResearcher = GuessRiddles.find({
      episodeId: this.episodeId
    }).fetch();
    guessRiddlesResearcher = _.pluck(guessRiddlesResearcher, 'riddleId');

    if (_.indexOf(guessRiddlesResearcher, this._id) !== -1)
      return true;

    return false;
  }
  ,open: function () {
    if(!Meteor.user()) return;

    var guessRiddlesResearcher = GuessRiddles.find({
      episodeId: this.episodeId
    }).fetch();
    guessRiddlesResearcher = _.pluck(guessRiddlesResearcher, 'riddleId');

    // если в эпизоде нет не одной загадки делаю 1 загадку открытой
    if ( guessRiddlesResearcher.length === 0 && this.position === 1 )
      return true;

    // создаю коллекцию id, position
    guessRiddlesResearcher = _.map(guessRiddlesResearcher, function( value ){
      var riddlePosition = Riddles.findOne({_id:value}).position;
      return {id: value, position: riddlePosition};
    });
    // определяю максимальную позицию отгаданной загадки в коллекции
    var maxGuessRiddle = _.max(guessRiddlesResearcher, function(guessRiddle){ return guessRiddle.position; });

    // если максимальная позиция отгаданной загадки + 1 равна позиции текущей то она открыта
    if ( maxGuessRiddle.position + 1 === this.position )
      return true;

    // если максимальная позиция отгаданной загадки больше позиции текущей то она открыта
    if ( maxGuessRiddle.position > this.position )
      return true;
    // в остальных случаях загадка закрыта
    return false;
  }
});
