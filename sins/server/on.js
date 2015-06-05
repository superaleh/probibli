Accounts.onLogin( function(user) {
  // нужно изменить структуру
  return;

  var userId = user.user._id;
  //беру все отгаданные загадки у исследователя
  var guessRiddlesResearcher = user.user.guessRiddles

  if( guessRiddlesResearcher.length > 0){

    //сортирую по дате отгадывания загадки
    var guessRiddlesResearcherSort = _.sortBy(guessRiddlesResearcher, function(guessRiddle){
      if (guessRiddle.date){
        return new Date(guessRiddle.date);
      }
      return 0;
    });

    //вынимаю последнюю отгаданную загадку
    var guessRiddleResearcherLast = guessRiddlesResearcherSort[guessRiddlesResearcherSort.length - 1];

    //если нет даты то выхожу
    if( !guessRiddleResearcherLast.date) return;

    //беру текущею дату и дату последней отгаданной загадки
    now = new Date();
    setdate = new Date(guessRiddleResearcherLast.date);

    //сейчас стоят минуты
    hours = (now - setdate) / 1000 / 60;
    hours = Math.round(hours);

    if ( hours >= 2) {
      //добавляю 1 грех
      Meteor.users.update( {_id:userId}, {$set:{sins:1}} )
      console.log('yese');
    }

  }
});
