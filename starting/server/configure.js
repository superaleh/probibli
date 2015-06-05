Accounts.onCreateUser(function(options, user) {
  user.wisdom = 0; //добавляю 0 мудрости
  user.sins = 0; //добавляю 0 грехов
  user.guessRiddles = 0; //добавляю 0 отгаданных загадок
  user.pastor = false;
  user.guides = false; //не прочитано и не пройдено не одного гида
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});
