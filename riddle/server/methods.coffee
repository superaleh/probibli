Meteor.methods
  responseOptions: (riddleId) ->
    curentRiddle = Riddles.findOne(_id: riddleId)
    responseOptionsArray = false
    if curentRiddle.falseResponse
      responseOptionsArray = _.chain(curentRiddle.falseResponse.split(',')).map((value) ->
        _.trim value
      ).value()
      responseOptionsArray.push curentRiddle.response
      responseOptionsArray = _.shuffle(responseOptionsArray)
    responseOptionsArray