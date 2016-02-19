Template.riddle.helpers({
  scopeSearch: function () {

    if( !this.scopeSearch ) return;
    var scopeSearchArray = EJSON.parse( this.scopeSearch );
    return scopeSearchArray.join(', ');
    
 }
	,help: function () {

		return this.help.replace(/([^>])\n/g, '$1<br>');
		
	}
})

