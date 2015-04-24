Template.newRiddle.helpers({
  settings: function() {
    return {
      position: "bottom"
      ,limit: 7
      ,rules: [
        {
          collection: Books
          ,token: '!'
          ,matchAll: false
          ,field: "name"
          ,template: Template.userPill
        }
      ]
    };
  }
  ,nextPosition: function () {
    var lastRiddleEpisode = Riddles.findOne(
      {episodeId: this._id}
      ,{sort: {position: -1}}
      );
    var nextPosition = lastRiddleEpisode ? lastRiddleEpisode.position + 1 : 1;
    return nextPosition;
  }
});