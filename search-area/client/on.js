Template.riddleAnswer.onDestroyed(function() {
  Session.set('enableVerses', '[]');
})

Template.searchArea.onRendered(function() {
  var chapter, now, placeBible, tab;

  Session.set('enableVerses', '[]');

  Meteor.setTimeout((function() {
    this.$('.bible-chapter-tab').tab();
  }), 200);

  chapter = _.chain(this.data.chapters).strLeft(',').trim().value();
  placeBible = this.data.books + chapter;
  tab = this.$('.bible-text[data-tab = chapter0]');

  tab.addClass('loading');

  HTTP.call('GET', 'http://api.bibleonline.ru/bible.html', {
    params: {
      q: placeBible
    }
  }, function(err, result) {
    if (err) {
      tab.hide().html('<h3>Извините! Сервис текста из Библии не доступен.</h3><h4 class="text-warning">Ошибка: ' + err.message + '</h4>').slideDown();
    } else {
      tab.html(result.content);
    }
    return tab.removeClass('loading');
  });

});