Template.searchArea.onCreated(function() {
  Session.set('enableVerses', []);
})

Template.riddleAnswer.onDestroyed(function() {
  Session.set('enableVerses', []);
})

Template.searchArea.onRendered(function() {

  Meteor.setTimeout((function() {
    this.$('.bible-chapter-tab').tab();
  }), 200);

  if( !this.data.scopeSearch ) return;
  var scopeSearchArray = EJSON.parse( this.data.scopeSearch );

  placeBible = scopeSearchArray[0];
  var tab = this.$('.bible-text[data-tab = chapter0]');

  tab.addClass('loading');

  HTTP.call('GET', 'http://api.bibleonline.ru/bible.html', {
    params: {
      q: placeBible
    }
  }, function(err, result) {
    if (err) {
      tab.hide().html('<h3>Извините! Сервис текста из Библии не доступен.</h3><h4 class="text-warning">Ошибка: ' + err.message + ' Попробуйте перезагрузить страницу</h4>').slideDown();
    } else {
      tab.html(result.content);
    }
    return tab.removeClass('loading');
  });

});