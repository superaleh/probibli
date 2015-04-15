Meteor.methods
  checkAnswer: (userResponse, riddleId) ->
    check userResponse, String
    check riddleId, String
    curentRiddle = Riddles.findOne(_id: riddleId)
    riddlesCurentEpisode = Riddles.find({ episodeId: curentRiddle.episodeId }, sort: idBz: 1).fetch()
    riddlesCurentEpisode = _.pluck(riddlesCurentEpisode, '_id')
    response = _.chain(curentRiddle.response).clean().value().toLowerCase()
    verses = curentRiddle.versesResponse.replace(RegExp(' ', 'gi'), '').replace(/:/gi, '').replace(/;/gi, '')
    correctResponse = response + verses
    if correctResponse == userResponse
      indexRiddle = _.indexOf(riddlesCurentEpisode, curentRiddle._id)
      nextRiddle = riddlesCurentEpisode[indexRiddle + 1]
      guessRiddlesUser = GuessRiddles.findOne(
        episodeId: curentRiddle.episodeId
        userId: @userId)
      riddleWisdom = 0
      if !guessRiddlesUser
        #Если еще не создана запись с отгаданными загадками, то создать ее.
        GuessRiddles.insert
          episodeId: curentRiddle.episodeId
          userId: @userId
          guessRiddles: [ curentRiddle._id ]
        riddleWisdom = curentRiddle.intricacy
      else
        #Иначе добавить id отгаданной загадки в массив
        if _.indexOf(guessRiddlesUser.guessRiddles, curentRiddle._id) == -1
          riddleWisdom = curentRiddle.intricacy
        GuessRiddles.update {
          episodeId: curentRiddle.episodeId
          userId: @userId
        }, $addToSet: guessRiddles: curentRiddle._id
      Meteor.users.update { _id: Meteor.userId() }, $inc: wisdom: riddleWisdom
      return {
        wisdom: riddleWisdom
        next: nextRiddle
      }
    false