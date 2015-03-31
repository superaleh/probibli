Router.route('/', function() {
  this.render('anonymous');
});

Router.route('/user', function() {
  this.layout('layout');
  this.render('user');
});

Router.route('/episode', function() {
  this.layout('layout');
  this.render('episode');
});

Router.route('/riddles', function() {
  this.render('riddles');
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('anonymous');
  } else {
    this.next();
  }
});