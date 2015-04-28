T9n.setLanguage("ru");

AccountsTemplates.removeField('email');

AccountsTemplates.removeField('password');

AccountsTemplates.addFields([
  {
    _id: 'username'
    ,type: 'text'
    ,displayName: {
      signIn: "Логин"
      ,signUp: "Придумай себе имя"
    }
    ,placeholder: {
      signIn: "Логин"
      ,signUp: "Латинские буквы, минимум 5 символов"
    }
    ,required: true
    ,minLength: 5
    ,trim: true
  }, {
    _id: 'password'
    ,type: 'password'
    ,displayName: {
      signIn: "Пароль"
      ,signUp: "Придумай себе пароль"
    }
    ,placeholder: {
      signIn: "Пароль"
      ,signUp: "Минимум 6 символов"
    }
    ,required: true
    ,minLength: 6
  }, {
    _id: 'city'
    ,type: 'text'
    ,displayName: {
      signUp: "Город в котором ты проживаешь"
    }
    ,placeholder: {
      signUp: "Например: Борисов"
    }
    ,required: true
    ,trim: true
  }
]);