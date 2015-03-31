AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: {
      signIn: 'Логин',
      signUp: 'Логин'
    },
    placeholder: {
        signIn: 'Логин',
        signUp: 'Логин'
    },
    required: true,
    minLength: 5,
  },
  {
    _id: 'password',
    type: 'password',
    displayName: {
      signIn: 'Пароль',
      signUp: 'Придумай пароль'
    },
    placeholder: {
        signIn: 'Пароль',
        signUp: "Минимум 6 символов"
    },
    required: true,
    minLength: 6
  }
]);

AccountsTemplates.configure({
  homeRoutePath: '/user',
  redirectTimeout: 4000,
  texts: {
    button: {
      signIn: "Войти",
      signUp: "Создать"
    },
    title: {
      signIn: "Войти",
      signUp: "Создать Профиль"
    },
    signInLink_pre: "У вас уже есть профиль?",
    signInLink_link: "Войти",
    signUpLink_pre: "Нет профиля чтобы начать?",
    signUpLink_link: "Создать",
  }
});

T9n.setLanguage('ru');