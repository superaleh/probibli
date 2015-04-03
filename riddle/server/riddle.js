Meteor.publish('singleRiddle', function(idRiddle) {

  check(idRiddle, String);

  return Riddles.find({_id: idRiddle});

});

Meteor.methods({
  checkAnswer: function (userResponse, idRiddle) {

    check(userResponse, String);
    check(idRiddle, String);

    
    var curentRiddle = Riddles.findOne({_id: idRiddle});

    var response = _.chain(curentRiddle.response).clean().value().toLowerCase();
    var verses = curentRiddle.versesResponse.replace(/ /gi, '').replace(/:/gi, '').replace(/;/gi, '');

    var correctResponse = response + verses;
    
    if(correctResponse === userResponse) {
      var riddleWisdom = curentRiddle.intricacy;
      Meteor.users.update({_id:Meteor.userId()}, {$inc: {wisdom: riddleWisdom}});
      return riddleWisdom;
    }
    
    return false;

  }
})