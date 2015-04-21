AutoForm.addHooks('insertEpisodeForm', {

  onSuccess: function(formType, result) {
    Router.go('episode', {_episodeId: result});
  }
  
})

AutoForm.addHooks('updateEpisodeForm', {

  onSuccess: function(formType, result) {
    var episodeId = Router.current().params._episodeId;
    Router.go('episode', {_episodeId: episodeId});
  }
  
})