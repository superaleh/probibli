Template.user.helpers({

  episodes: function() {

    return Episodes.find();

  }

});

Template.episodeItem.helpers({
  count: function() {

    var riddles = Riddles.find({episodeId: this._id}).count();
    var guess = GuessRiddles.findOne({episodeId: this._id, userId: Meteor.userId()});

    if(guess){
      guess = guess.guessRiddles.length;
    }
    else {
      return {
       riddles: riddles
       ,guess: 0
       ,percent: 0
      }
    }

    var percent = ( ( guess / riddles ) * 100 ).toFixed(0)
    return {
     riddles: riddles
     ,guess: guess
     ,percent: percent
    }

  }
  ,newEpisode: function() {

    var now = new Date().getTime();
    var creatingDate = Episodes.findOne({_id: this._id}).creating;
    //если прошло меньше 30 дней от создания эпизода, то он новый
    if( moment(now).diff(creatingDate, 'days') < 30 ) return true;
    return false;
  }
});

Template.usersBest.helpers({
  users: function() {

    var users = Meteor.users.find().fetch();

    users = _.map(users, function(value, key){
    
      value.place = ++key;

      return value;
    
    });

    return users;
  }
});