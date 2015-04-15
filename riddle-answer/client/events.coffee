Template.riddleAnswer.events
  'submit form.response-user': (e, template) ->
    e.preventDefault()
    idRiddle = @_id
    response = $(e.target).find('[name=response-user]').val()
    verses = template.$('.bible.enabled')
    response = _.chain(response).clean().value().toLowerCase()
    #удаляю пробелы из начала и конца, преобразовывю в нижний регистр
    verses = _.chain(verses).map((value, key) ->
      value = $(value).attr('id')
      #получаю bible-7-16-5
      value = value.replace(/bible-/gi, '')
      #удаляю bible-
      value = _.strRight(value, '-')
      #удаляю 7-
      value = value.replace(/-/gi, '')
      #удаляю -
      value
    ).value().join('')
    userResponse = response + verses
    Meteor.call 'checkAnswer', userResponse, idRiddle, (error, result) ->
      #потраченное время на загадку от захода до нажатие кнопки отгадать
      now = (new Date).getTime()
      startTime = Session.get('startTime')
      timeDiff = moment.duration(now - startTime)
      timeMessege = '<span class="glyphicon glyphicon-time"></span> Время исследования: ' + timeDiff.minutes() + 'м:' + timeDiff.seconds() + 'с'
      message = '<h2>Прочти еще раз!</h2><h3>' + timeMessege + '</h3>'
      title = '<h1>Не правильно!</h1>'
      buttons = 
        cancel:
          label: '<span class="glyphicon glyphicon-repeat"></span> Вернуться к загадке'
          className: 'btn-default'
          callback: ->
            if result != false
              Session.set 'wisdomAddition', '+' + result.wisdom
            return
        overview:
          label: '<span class="glyphicon glyphicon-th-large"></span> Обзор эпизода'
          className: 'btn-info'
          callback: ->
            if result != false
              Session.set 'wisdomAddition', '+' + result.wisdom
            Router.go 'episode', _id: template.data.episodeId
            return
      if result != false
        message = '<h2>Правильно! Ты заработал: +' + result.wisdom + ' мудрости</h2><h3>' + timeMessege + '</h3>'
        title = '<h1>Правильно! Поздравляем!</h1>'
        _.extend buttons, next:
          label: '<span class="glyphicon glyphicon-chevron-right"></span> Следующая загадка'
          className: 'btn-success'
          callback: ->
            Session.set 'wisdomAddition', '+' + result.wisdom
            Router.go 'riddle',
              _episodeId: template.data.episodeId
              _id: result.next
            return
      bootbox.dialog
        message: message
        title: title
        closeButton: false
        buttons: buttons
      return
    return