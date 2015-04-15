Template.episodesAll.helpers
  episodes: ->
    episodes = Episodes.find {}, sort: creating: 1
  count: ->
    riddles = @numberRiddles
    guessRiddles = Meteor.user().guessRiddles
    if guessRiddles.length > 0
      #фильтрую массив по id эпизода
      guessRiddles = _.filter guessRiddles, (value)->
        value.episodeId is @_id
      guessRiddles = guessRiddles

    guess = guessRiddles.length
    percent = (guess / riddles * 100).toFixed(0)
    {
      riddles: riddles
      guess: guess
      percent: percent
    }
  newEpisode: ->
    now = (new Date).getTime()
    creatingDate = Episodes.findOne(_id: @_id).creating
    #если прошло меньше 14 дней от создания эпизода, то он новый
    if moment(now).diff(creatingDate, 'days') < 14
      return true
    false
