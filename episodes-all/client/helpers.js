Template.episodesAll.helpers({
  episodes: function() {
    var episodes;
    return episodes = Episodes.find({}, {
      sort: {
        creating: 1
      }
    });
  },
  count: function() {
    var riddles = this.numberRiddles;
    var guessRiddlesResearcher = Meteor.user().guessRiddles;
    if (guessRiddlesResearcher.length > 0) {
      /*
      #фильтрую массив по id эпизода
       */
      guessRiddlesResearcher = _.where(guessRiddlesResearcher, { episodeId: this._id });
    }


    var guess = guessRiddlesResearcher.length;
    var percent = (guess / riddles * 100).toFixed(0);

    return {
      riddles: riddles,
      guess: guess,
      percent: percent
    };
  },
  newEpisode: function() {
    var creatingDate, now;
    now = (new Date).getTime();
    creatingDate = Episodes.findOne({
      _id: this._id
    }).creating;

    /*
    #если прошло меньше 14 дней от создания эпизода, то он новый
     */
    if (moment(now).diff(creatingDate, 'days') < 14) {
      return true;
    }
    return false;
  }
});