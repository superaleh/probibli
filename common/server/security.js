Security.defineMethod("ifHasPastor", {
    fetch: []
    ,transform: null
    ,deny: function (type, arg, userId, doc) {

      if (Meteor.user() !== null) {
        
        var pastor = Meteor.users.findOne( {_id: userId} ).pastor;
        return !pastor;
        
      }

      return false;

    }
});