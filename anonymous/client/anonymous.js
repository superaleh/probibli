accountsUIBootstrap3.setLanguage('ru');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.anonymous.helpers({
  users: function() {
    var users = Meteor.users.find().fetch();
    users = _.map(users, function(value, key){
    
      value.place = ++key;

      return value;
    
    });
    return users;
  }
})