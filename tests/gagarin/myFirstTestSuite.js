describe('Первые пробные тесты', function () {
  var server = meteor();
  var client = browser(server);

  before(function () {
    return server.execute(function () {
      Accounts.createUser({username: 'pastor',password: '123456'});
    })
  });

  it('Авторизация', function () {
    return client
      .login('pastor','123456')
      .execute(function () {
        return Meteor.user();
      })
  });
});
