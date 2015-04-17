Template.riddleAnswer.helpers({
  responseType: function() {
    return ReactiveMethod.call('responseType', this._id);
  }
  ,checkAnswer: function() {
    return Session.get('checkAnswer');
  }
});