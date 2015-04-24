Security.defineMethod("ifHasPastor", {
    fetch: []
    ,transform: null
    ,deny: function (type, arg, userId, doc) {

      var pastor = Meteor.users.findOne( {_id: userId} ).pastor;
      return !pastor;
      
    }
});