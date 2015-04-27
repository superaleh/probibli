AutoForm.addHooks( 'insertRiddleForm', {

  onSuccess: function( formType, resultId ) {
  
    var insertRiddle = Riddles.findOne( { _id: resultId } );
    var episodeId = Router.current().params._episodeId;

    Router.go( 'riddle', { _episodeId: episodeId, _riddleId: resultId } );
  
  }
  
})

AutoForm.addHooks( 'updateRiddleForm', {

  onSuccess: function(formType, result) {

    var episodeId = Router.current().params._episodeId;
    var riddleId = Router.current().params._riddleId;
    Router.go( 'riddle', { _episodeId: episodeId, _riddleId: riddleId } );

  }
  
})