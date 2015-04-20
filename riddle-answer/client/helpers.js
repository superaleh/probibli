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
  ,countWordsResponseUser: function() {
    return Session.get('countWordsResponse');
  }
  ,countWordsResponseRiddle: function() {
    return ReactiveMethod.call('countWordsResponseRiddle', this._id);
  }
});