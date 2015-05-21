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
  ,selectedVersesCount: function() {
    var enableVersesUser = Session.get('enableVerses');
    return enableVersesUser.length;
  }
});


Template.buttonSubmit.helpers({
  disabledButton: function () {
    var enableVersesUserCount = Session.get('enableVerses');
    var countWordsResponse = Session.get('countWordsResponse');

    if ( enableVersesUserCount.length === this.versesCount && countWordsResponse > 0)
      return true;

    return false;
  }
})
