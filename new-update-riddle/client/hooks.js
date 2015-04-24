AutoForm.addHooks( 'insertRiddleForm', {

  onSuccess: function( formType, resultId ) {
  
    var insertRiddle = Riddles.findOne( { _id: resultId } );
    var episodeId = Router.current().params._episodeId;
    
    // инкрементирую число загадок в эпизоде, если загадка опубликована
    if( insertRiddle && insertRiddle.publish ){

      Episodes.update(
        { _id: episodeId }
        ,{ $inc: { numberRiddles: 1 } }
      );

    }

    Meteor.setTimeout(function() {

      Router.go( 'riddle', { _episodeId: episodeId, _riddleId: resultId } );
  
    }, 500)
  
  }
  
})

AutoForm.addHooks( 'updateRiddleForm', {

  onSuccess: function(formType, result) {
    var episodeId = Router.current().params._episodeId;
    var riddleId = Router.current().params._riddleId;
    Router.go( 'riddle', { _episodeId: episodeId, _riddleId: riddleId } );
  }
  
})