Template.searchArea.events
  'click .bible-chapter-tab a': (e, template) ->
    #при клике по вкладке загружается данная глава
    e.preventDefault()
    if $(e.target).parent().hasClass('in active')
      return
    
    #если вкладка активна то выходим
    placeBible = $(e.target).text()
    tabId = $(e.target).attr('href')
    if $(tabId + ' .bible-text').html()
      return

    #если текс во вкладку уже загружался то выходим
    HTTP.call 'GET', 'http://api.bibleonline.ru/bible.html', { params: q: placeBible }, (err, result) ->
      @$(tabId + ' .bible-text').hide().html(result.content).slideDown()
      @$(tabId + ' .progress').slideUp()
      return

    return

  'click .bible-text p.bible': (e) ->
    e.preventDefault()
    $(e.target).toggleClass 'enabled'
    return