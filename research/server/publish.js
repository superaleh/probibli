Meteor.publish('researcher', function() {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        'username': 1
        ,'wisdom': 1
        ,'guessRiddles': 1
        ,'guides': 1
        ,'pastor': 1
        ,'status': 1
        ,'createdAt': 1
      }
    });
  } else {
    this.ready();
  }
});
