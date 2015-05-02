Template.messageSupport.helpers({
  riddleId: function () {
    return this._id;
  }
  ,riddleQuestion: function () {
    return this.question;
  }
  ,researcherName: function () {
    researcher = Meteor.users.findOne( { _id: Meteor.userId()} )
    return researcher.username;
  }
});

Template.support.helpers({
  supports: function () {
    if ( Meteor.user() ){
      var supportAllArray = Support.find().fetch();
      if ( Meteor.user().pastor ){
        // группирую все обращения по ID исследователям
        var groupSupport = _.groupBy( supportAllArray, 'createdBy' );
        // возвращаю массив сгруппированных объектов
        return _.toArray( groupSupport );
      } else {
        // группирую все обращения по ID загадкам
        var groupSupport = _.groupBy( supportAllArray, 'riddleId' );
        // возвращаю массив сгруппированных объектов
        return _.toArray( groupSupport );
      }
    }
  }
  ,riddleQuestionSupport: function () {
    var supportItem = this;
    var lastSupportItem = supportItem[ supportItem.length - 1];
    return lastSupportItem.riddleQuestion;
  }
  ,createdAtSupport: function () {
    var supportItem = this;
    var lastSupportItem = supportItem[ supportItem.length - 1];
    return moment( lastSupportItem.createdAt ).fromNow();
  }
  ,researcherNameSupport: function () {
    var supportItem = this;
    var lastSupportItem = supportItem[ supportItem.length - 1];
    return lastSupportItem.researcherName;
  }
});
