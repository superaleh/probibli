Template.episodesAll.helpers({
  episodes: function() {
    var episodes;
    return episodes = Episodes.find({}, {
      sort: {
        createdAt: -1
      }
    });
  },
  count: function() {
    if(!Meteor.user())
      return 0;

    var guessRiddlesResearcher = Meteor.user().guessRiddles;
    check(guessRiddlesResearcher, Array);

    var count = {
      riddles: (this.numberRiddles ? this.numberRiddles : 0)
      ,guess: (guessRiddlesResearcher.length ? _.where(guessRiddlesResearcher, { episodeId: this._id }).length : 0)
      ,percent: 0
    };

    if (count.riddles === 0 || count.guess === 0)
      return count;

    count.percent = (count.guess / count.riddles * 100).toFixed(0);

    return count;
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