Meteor.publish 'episodes', (episodeId) ->
  if episodeId
    Episodes.find
      _id: episodeId
  else
    Episodes.find()