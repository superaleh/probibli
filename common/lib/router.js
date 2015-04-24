Router.configure({
  loadingTemplate: 'loading',
  progressSpinner: false
});

Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    Router.go('starting');
    this.next();
  } else {
    this.next();
  }
});

var requirePastor = function() {
  if (Meteor.user() !== null) {
    if (Meteor.user().pastor) {
      this.next();
    } else {
      Router.go('research');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requirePastor, {
  only: ['newEpisode', 'editEpisode', 'newRiddle', 'editRiddle']
});