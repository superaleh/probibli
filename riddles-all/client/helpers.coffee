Template.riddlesAll.helpers 
  riddles: ->

    riddles = Riddles.find(
      {}, 
      sort:
        intricacy: 1
        position: 1
    ).fetch()

    guessRiddlesResearcher = Meteor.user().guessRiddles

    guessRiddlesResearcher = _.filter guessRiddlesResearcher, (value)->
      value.episodeId is @_id

    if guessRiddlesResearcher.length is 0

      #если нет не одной отгаданной загадки то доступна только первая загадка
      riddles[0].availability = true #доступная загадка
      riddles[0].next = true #следующая загадка

    else
      
      guessRiddlesResearcher = _.pluck guessRiddlesResearcher, 'riddleId'
      #иначе если есть хоть одна отгаданная загадка, то делаю ее доступной и следующую после нее
      riddles = _.map(riddles, (riddle, key) ->
        #загадка доступна если она отгадана
        if _.indexOf(guessRiddlesResearcher, riddle._id) != -1
          riddle.availability = true
        else
          riddle.availability = false #НЕдоступная загадка
        riddle
      )
      #доступная загадка
      riddles[guessRiddlesResearcher.length].availability = true
      #следующая загадка
      riddles[guessRiddlesResearcher.length].next = true

    riddles