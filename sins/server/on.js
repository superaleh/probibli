Accounts.onLogin( function(user) {

  var userId = user.user._id;

  //получаю дату активности
  var activeDate = user.user.activeDate;

  if( activeDate ){

    //беру текущею дату и дату последней отгаданной загадки
    now = new Date();
    setdate = new Date(activeDate);


    // вычисляю количество мудрости
    hours = (now - setdate) / 1000 / 60 / 60;
    hours = Math.floor(hours);
    var sins = Math.floor( hours / 72 );

    if ( sins >= 1 ) {

      // устанавливаю дату актвности, чтобы не начислять грехи повторно
      Meteor.users.update(
         { _id: userId }
         ,{ $set: { activeDate: now } }
      );

      // беру все отгаданные загадки
      var guessRiddlesResearcher = GuessRiddles.find(
        { researcherId: userId }
      ).fetch();

      // с помощью цикла по количеству грехов делаю загадки помеченные 1 грехом
      while ( sins !== 0 ) {

        guessRiddlesResearcher = _.shuffle(guessRiddlesResearcher);
        // возвращаю последний элемент массива и удаляю его
        var guessRiddle = guessRiddlesResearcher.pop();

        // если отгаданных загадок меньше чем начисленных грехов то начисленные грехи обнуляю и выхожу из цикла
        if ( guessRiddlesResearcher.length == 0 ){
          sins == 0;
          continue;
        }

        // делаю проверки, чтобы цена отгаданной загадки равнялась 1 мудрости и отгаданная загадка уже не была помеченна грехом. Если условие не проходит, то повторяю цикл заного
        var riddle = Riddles.findOne( { _id: guessRiddle.riddleId } );
        if( riddle.intricacy === 1  && guessRiddle.sins === 0){
          // помечаю загадку 1 грехом
          GuessRiddles.update( { _id: guessRiddle._id }, { $set: { sins: 1 } } );

          // добавляю 1 грех и отнимаю 1 мудрость
          Meteor.users.update(
            { _id: userId }
            ,{
              $inc: { wisdom: -1, sins: 1  }
            }
          )

          // декременитрую грех, следовательно 1 итерация прошла, иначе итерация повторяется, пока грех не станет 0
          sins--;
        }

      }

    }

  }
});
