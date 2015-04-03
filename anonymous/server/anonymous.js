Accounts.onCreateUser(function(options, user) {
  
  user.wisdom = 0; //добавляю 0 мудрости
  if (options.profile)
    user.profile = options.profile;
  return user;

});