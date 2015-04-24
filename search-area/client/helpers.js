Template.searchArea.helpers({
  placesBibleText: function() {

    var currentRiddle = Riddles.findOne();

    if( !currentRiddle.scopeSearch ) return;
    var scopeSearchArray = EJSON.parse( currentRiddle.scopeSearch );
    placesBible = scopeSearchArray.map(function(place, index) {
      return {
        id: index
        ,place: place
        ,active: index ? '' : 'active'
      };
    });
    return placesBible;
  }
  ,selectedVersesCount: function() {
    var enableVersesUser = Session.get('enableVerses');
    return enableVersesUser.length;
  }
});