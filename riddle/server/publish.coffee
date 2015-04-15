Meteor.publish 'riddles', (episodeId, riddleId = false) ->
  if riddleId
    Riddles.find { 
      _id: riddleId
      episodeId: episodeId
    }, fields:
      response: 0
      falseResponse: 0
      versesResponse: 0
  else
    Riddles.find { 
      episodeId: episodeId
    }, fields:
      response: 0
      falseResponse: 0
      versesResponse: 0