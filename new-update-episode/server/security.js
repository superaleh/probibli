Security.defineMethod("ifHasPastor", {
    fetch: []
    ,transform: null
    ,deny: function (type, arg, userId, doc) {

      var pastor = Meteor.users.findOne( {_id: userId} ).pastor;
      return !pastor;
      
    }
});

Episodes.permit(['insert', 'update', 'remove']).ifHasPastor().apply();