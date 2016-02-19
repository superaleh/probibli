Template.episodesAll.helpers({
  episodes: function() {
    var episodes;
    return episodes = Episodes.find({}, {
      sort: {
        //epoch: 1
        createdAt: -1
      }
    });
  },
  count: function() {
    if(!Meteor.user())
      return 0;

    var guessRiddlesResearcher = GuessRiddles.find({
      researcherId: Meteor.userId()
      ,episodeId: this._id
    });

    var count = {
      riddles: (this.numberRiddles ? this.numberRiddles : 0)
      ,guess: guessRiddlesResearcher.count()
      ,percent: 0
    };

    if (count.riddles === 0 || count.guess === 0)
      return count;

    count.percent = (count.guess / count.riddles * 100).toFixed(0);

    return count;
  },
  newEpisode: function() {
    var now = (new Date).getTime();

    /*
    #если прошло меньше количества дней от создания эпизода, то он новый
     */
    if (moment(now).diff(this.createdAt, 'days') < 20) {
      return true;
    }
    return false;
  },
  /*newEpoch: function() { // создание эпох в которых будут эпизоды
    newEpoch.forEach(function(epoch, i) {
    var output2 = []; 
      if (i == 1) epoch.range = "Hачало";
      if (i == 2) epoch.range = "Эпоха патриархов";
      if (i == 3) epoch.range = "Исход из Египта";
      if (i == 4) epoch.range = "Эпоха Судей";
      if (i == 5) epoch.range = "Эпоха Царей";
    return output2;
  },*/
  
});
