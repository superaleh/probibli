Accounts.onCreateUser (options, user) ->
  user.wisdom = 0 #добавляю 0 мудрости
  user.guessRiddles = [] #добавляю 0 отгаданных загадок
  user.pastor = false
  if options.profile
    user.profile = options.profile
  user