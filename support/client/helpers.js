Template.support.helpers({
  supports: function () {
    return Supports.find();
  }
});

Template.supportMessages.helpers({
  messages: function () {
    return Messages.find();
  }
  ,companion: function () {
    var currentResearcherId = Meteor.userId();
    var researcherSupport = false;

    if ( currentResearcherId === this.createdBy )
      researcherSupport = Meteor.subscribe( "researcherSupport", false);
    else
      researcherSupport = Meteor.subscribe( "researcherSupport", this.createdBy);

    if ( researcherSupport && researcherSupport.ready() )
      return Meteor.users.findOne( { _id: this.createdBy } );
    return false;
  }
  ,currentResearcher: function () {
    var researcherId = Meteor.userId();
    if ( researcherId === this.createdBy )
      return true;
    return false;
  }
  ,riddle: function () {
    var currentRiddleId = this.riddleId;

    var riddleSupport = Meteor.subscribe( "riddles", {}, currentRiddleId );

    if ( riddleSupport && riddleSupport.ready() )
      var riddle = Riddles.findOne();
      if ( riddle ) {
        var scopeSearchArray = EJSON.parse( riddle.scopeSearch );
        riddle.scopeSearch = scopeSearchArray.join(', ');
        return riddle;
      }
    return false;
  }
});

Template.newMessageSupport.helpers({
  researcherName: function () {
    researcher = Meteor.users.findOne( { _id: Meteor.userId()} )
    return researcher.username;
  }
  ,researcherCity: function () {
    researcher = Meteor.users.findOne( { _id: Meteor.userId()} )
    return researcher.profile.city;
  }
});
