Accounts.onCreateUser(function(options, user) {
  var now = new Date();

  user.wisdom = 0; //добавляю 0 мудрости
  user.sins = 0; //добавляю 0 грехов
  user.guessRiddles = 0; //добавляю 0 отгаданных загадок
  user.pastor = false;
  user.guides = false; //не прочитано и не пройдено не одного гида
  user.activeDate = now; //дата активности для расчета системы грехов
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});
