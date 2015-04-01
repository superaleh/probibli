Router.route('/', function() {
  this.render('anonymous');
});

Router.route('/user', function() {
  this.layout('layout');
  this.subscribe('episodes');
  this.subscribe('riddlesCountByEpisod');
  this.render('user');
});

Router.route('/episodes/:_id', function() {
  this.layout('layout');
  this.subscribe('riddles', this.params._id);
  this.subscribe('singleEpisode', this.params._id);
  this.render('episode',{
    data: function() {
      return Episodes.findOne(this.params._id);
    }
  });
});

Router.route('/riddles/:_id', function() {
  this.layout('layout');
  this.subscribe('singleRiddle', this.params._id);
  this.render('riddle',{
    data: function() {
      return Riddles.findOne(this.params._id);
    }
  });
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('anonymous');
  } else {
    this.next();
  }
});