Accounts.onLogin( function(user) {

  var userId = user.user._id;
  //беру последнюю отгаданную загадку у исследователя
  var guessLastRiddleResearcher = GuessRiddles.findOne(
    { researcherId: userId }, { sort: { createdAt: -1 } }
  );

  if( guessLastRiddleResearcher){

    //беру текущею дату и дату последней отгаданной загадки
    now = new Date();
    setdate = new Date(guessLastRiddleResearcher.createdAt);

    hours = (now - setdate) / 1000 / 60 / 60;
    hours = Math.floor(hours);

    if ( hours > 72 && user.user.sins === 0) {

      // беру все отгаданные загадки
      var guessRiddlesResearcher = GuessRiddles.find(
        { researcherId: userId }
      ).fetch();

      // с помощью цикла по количеству грехов делаю загадки помеченные 1 грехом
      var sins = 1;
      while ( sins !== 0) {

        guessRiddlesResearcher = _.shuffle(guessRiddlesResearcher);
        // возвращаю последний элемент массива и удаляю его
        var guessRiddle = guessRiddlesResearcher.pop();

        // делаю проверки, чтобы цена отгаданной загадки равнялась 1 мудрости и отгаданная загадка уже не была помеченна грехом. Если условие не проходит, то повторяю цикл заного
        var riddle = Riddles.findOne( { _id: guessRiddle.riddleId } );
        if( riddle.intricacy === 1  && guessRiddle.sins === 0){
          // помечаю загадку 1 грехом
          GuessRiddles.update( { _id: guessRiddle._id }, { $set: { sins: 1 } } );
          // декременитрую грех, следовательно 1 итерация прошла, иначе итерация повторяется, пока грех не станет 0
          sins--;
        }

      }

      Meteor.users.update(
        { _id: userId }
        ,{
          $set: { sins: 1 }
          ,$inc: { wisdom: -1 }
        }
      )
    }

  }
});
