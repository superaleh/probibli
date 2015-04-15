Template.episodesAll.onRendered ->
  Meteor.setTimeout (->
    @$('.progress').progress()
    return
  ), 500
    