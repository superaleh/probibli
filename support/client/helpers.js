Template.support.helpers({
  supports: function () {
    return Supports.find();
  }
  ,createdAt: function () {
    var createdAt = this.createdAt;
    if ( createdAt )
      return moment( createdAt ).format( 'LL' );
  }
});

Template.messageSupport.helpers({
  researcherName: function () {
    researcher = Meteor.users.findOne( { _id: Meteor.userId()} )
    return researcher.username;
  }
  ,researcherCity: function () {
    researcher = Meteor.users.findOne( { _id: Meteor.userId()} )
    return researcher.profile.city;
  }
});
