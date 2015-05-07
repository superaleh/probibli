Riddles.before.insert(function (userId, doc) {

  // инкрементирую число загадок в эпизоде
  Episodes.update(
    { _id: doc.episodeId }
    ,{ $inc: { numberRiddles: 1 } }
  );

  // получаю все загадки эпизода
  var riddles = Riddles.find({
    episodeId: doc.episodeId
  }, {
    sort: {
      position: 1
    }
  }).fetch();

  // разрезаю массив на две части, место разреза это позиция добавленной загадки
  var startStack = riddles.splice(0, doc.position -1);

  // теперь склеиваю два массива в один, а между ними пустышку чтобы получить новые индексы
  riddles = startStack.concat(false, riddles);

  // далее обновляю позицию каждой загадки в соответствии с новым индексом массива
  riddles.forEach(function (riddle, index) {

    if ( riddle !== false )
      Riddles.update( {_id: riddle._id}, {$set: {position: index + 1}} );

  });

});

Riddles.before.update(function (userId, doc, fieldNames, modifier, options) {

  // получаю все опубликованные загадки эпизода
  var riddles = Riddles.find({
    episodeId: modifier.$set.episodeId
  }, {
    sort: {
      position: 1
    }
  }).fetch();

  if( doc.position !== modifier.$set.position ){

    var newPosition = modifier.$set.position;
    var oldPosition = doc.position;

    if ( oldPosition > newPosition ) {

      // если старая позиция больше новой, беру стек между новой позицией и старой и инкрементирую их позицию
      var incArray = riddles.slice( newPosition -1, oldPosition -1 );
      incArray.forEach(function (riddle) {
        var position = riddle.position + 1;
        Riddles.update( {_id: riddle._id}, {$set: {position: position}} );
      })
    } else {

      // если новая позиция больше старой, беру стек между старой позицией и новой и декрементирую их позицию
      var decArray = riddles.slice( oldPosition, newPosition );
      decArray.forEach(function (riddle) {
        var position = riddle.position - 1;
        Riddles.update( {_id: riddle._id}, {$set: {position: position}} );
      })

    }

  }

});
