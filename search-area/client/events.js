Template.searchArea.events({
  //при клике по вкладке загружается данная глава
  'click a.bible-chapter-tab': function(e, template) {
    var placeBible, tab, tabId;
    e.preventDefault();
    placeBible = $(e.target).text();
    tabId = $(e.target).data('tab');
    tab = $('.bible-text[data-tab = ' + tabId + ']');

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
        tab.hide().html('<h3>Извините! Сервис текста из Библии не доступен.</h3><h4 class="text-warning">Ошибка: ' + err.message + '</h4>').slideDown();
      } else {
        tab.html(result.content);
      }
      return tab.removeClass('loading');
    });
  }
  ,'click .bible-text p.bible': function(e) {
    var verseBible, indexVerse;
    var enableVersesUser = Session.get('enableVerses') ? Session.get('enableVerses') : '[]';
    enableVersesUser = EJSON.parse( enableVersesUser );
    e.preventDefault();
    
    $(e.target).toggleClass('enabled');

    verseBible = $(e.target).attr('id');
    verseBible = verseBible.replace(/bible-/gi, '');
    verseBible = _.strRight(verseBible, '-');
    verseBible = +verseBible.replace(/-/gi, '');

    indexVerse = _.indexOf(enableVersesUser, verseBible);

    if(indexVerse === -1)
      enableVersesUser.push(verseBible);      
    else
      enableVersesUser = _.without(enableVersesUser, enableVersesUser[indexVerse]);

    enableVersesUser = _.sortBy(enableVersesUser, function(value){ return value; });

    enableVersesUser = EJSON.stringify(enableVersesUser);
    Session.set('enableVerses', enableVersesUser);
  }
});