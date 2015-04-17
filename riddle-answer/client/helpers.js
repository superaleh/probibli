Template.riddleAnswer.helpers({
  responseType: function() {
    return ReactiveMethod.call('responseType', this._id);
  }
  ,checkAnswer: function() {
    return Session.get('checkAnswer');
  }
  ,nextRiddleId: function() {
    return ReactiveMethod.call('nextRiddleId', this.position, this.episodeId);
  }
});