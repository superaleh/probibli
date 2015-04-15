Template.riddle.helpers
  responseOptions: ->
    ReactiveMethod.call 'responseOptions', @_id

Template.riddle.onRendered ->
  #установка время начала отгадывания
  now = (new Date).getTime()
  Session.set 'startTime', now
  #загрузка текста первой главы
  chapter = _.chain(@data.chapters).strLeft(',').trim().value()
  placeBible = @data.books + chapter
  tabId = '#chapter0'
  HTTP.call 'GET', 'http://api.bibleonline.ru/bible.html', { params: q: placeBible }, (err, result) ->
    if err
      @$(tabId + ' .bible-text').hide().html('<h3>Извините! Сервис текста из Библии не доступен.</h3><h4 class="text-warning">Ошибка: ' + err.message + '</h4>').slideDown()
    else
      @$(tabId + ' .bible-text').hide().html(result.content).slideDown()
    @$(tabId + ' .progress').slideUp()
    return
  return