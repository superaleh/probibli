Template.searchArea.events({
  //при клике по вкладке загружается данная глава
  'click a.bible-chapter-tab': function(e, template) {

    e.preventDefault();
    var placeBible = $(e.target).text();
    var tabId = $(e.target).data('tab');
    var tab = $('.bible-text[data-tab = ' + tabId + ']');

    //если текс во вкладку уже загружался то выходим
    if (tab.html()) {
      return;
    }

    tab.addClass('loading');

    HTTP.call('GET', 'http://api.bibleonline.ru/bible.html', {
      params: {
        q: placeBible
      }
    }, function(err, result) {
      if (err) {
        tab.hide().html('<h3>Извините! Сервис текста из Библии не доступен.</h3><h4 class="text-warning">Ошибка: ' + err.message + '. Попробуйте перезагрузить страницу</h4>').slideDown();
      } else {
        tab.html(result.content);
      }
      return tab.removeClass('loading');
    });

  }
  ,'click .bible-text p.bible': function(e) {

    var enableVersesUser = Session.get('enableVerses') ? Session.get('enableVerses') : [];
    e.preventDefault();
    
    $(e.target).toggleClass('enabled');

    var verseBible = $(e.target).attr('id');
    verseBible = verseBible.replace(/bible-\d+-/gi, '');
    verseBible = verseBible.replace(/-/gi, ':');

    var indexVerse = _.indexOf(enableVersesUser, verseBible);

    if(indexVerse === -1)
      enableVersesUser.push(verseBible);
    else
      enableVersesUser = _.without(enableVersesUser, enableVersesUser[indexVerse]);

    Session.set('enableVerses', enableVersesUser);

  }
});