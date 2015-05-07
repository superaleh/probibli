AutoForm.addHooks( 'insertRiddleForm', {

  onSuccess: function( formType, resultId ) {

    var insertRiddle = Riddles.findOne( { _id: resultId } );
    var episodeId = Router.current().params._episodeId;

    Router.go( 'episode', { _episodeId: episodeId } );

  }

})

AutoForm.addHooks( 'updateRiddleForm', {

  onSuccess: function(formType, result) {

    var episodeId = Router.current().params._episodeId;
    Router.go( 'episode', { _episodeId: episodeId } );

  }

})
