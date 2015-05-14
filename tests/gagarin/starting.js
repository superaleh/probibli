
describe('Регистрация и авторизация исследователя', function () {

  var server = meteor();
  var client = browser(server);

  it('Регистрация', function () {
    return client
      .click('#at-signUp')
      .sendKeys('#at-field-username', 'pastor')
      .sendKeys('#at-field-password', '123456')
      .sendKeys('#at-field-password_again', '123456')
      .sendKeys('#at-field-city', 'Борисов')
      .click('#at-btn')
      .wait(2000, 'Meteor.user()', function () {
        return Meteor.user();
      })
      .then(function(res) {
        expect(res).to.not.null;
      });
  });

  it('Авторизация', function () {
    return client
      .logout()
      .sendKeys('#at-field-username', 'pastor')
      .sendKeys('#at-field-password', '123456')
      .click('#at-btn')
      .wait(2000, 'Meteor.user()', function () {
        return Meteor.user();
      })
      .then(function(res) {
        var username = res.username;
        expect(username).to.eql('pastor');
      });
  });

});
