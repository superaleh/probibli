Template.riddle.helpers({
  titleEpisode: function() {
    var episode = Episodes.findOne();
    return episode.title;
  }
  ,idEpisode: function() {
    var episode = Episodes.findOne();
    return episode._id;
  }
  ,placesBibleText: function() { //формирование массива с главами, пока только сделал при одной книге (сделать когда несколько книг)
    var riddle = Riddles.findOne();
    var books = riddle.books;
    var chapters = riddle.chapters;
    var placesBible = _.chain(chapters)
      .words(',')
      .map(function(chapter, index){
        return {
          id: index
          ,place: books + ' ' + _.trim(chapter)
          ,active: index ? '' : 'in active'
        }
      })
      .value();
    return placesBible;
  }
  ,responseOptions: function () {
    return ReactiveMethod.call('responseOptions', this._id);
  }
});

Template.riddle.events({

  'click .bible-chapter-tab a': function(e, template) { //при клике по вкладке загружается данная глава
  
    e.preventDefault();

    if( $(e.target).parent().hasClass('in active') ) return; //если вкладка активна то выходим

    var placeBible = $(e.target).text();
    var tabId = $(e.target).attr("href");

    if($(tabId + ' .bible-text').html()) return; //если текс во вкладку уже загружался то выходим
    
    HTTP.call("GET", "http://api.bibleonline.ru/bible.html", {params:{ q: placeBible }}, function(err, result){
      this.$(tabId + ' .bible-text').hide().html(result.content).slideDown();
      this.$(tabId + ' .progress').slideUp();
    })

  }
  ,'click .bible-text p.bible': function (e) {
    e.preventDefault();
    $(e.target).toggleClass("enabled");
  }
  ,'submit form.response-user': function (e, template) {
    e.preventDefault();

    var idRiddle = this._id;
    var response = $(e.target).find('[name=response-user]').val();
    var verses = template.$('.bible.enabled');

    response = _.chain(response).clean().value().toLowerCase() //удаляю пробелы из начала и конца, преобразовывю в нижний регистр

    verses = _.chain(verses).map(function(value, key){
    
      value = $(value).attr('id'); //получаю bible-7-16-5
      value = value.replace(/bible-/gi, ''); //удаляю bible-
      value = _.strRight(value, '-'); //удаляю 7-
      value = value.replace(/-/gi, ''); //удаляю -
      return value;
    
    }).value().join('');

    userResponse = response + verses;

    Meteor.call('checkAnswer'
      ,userResponse
      ,idRiddle
      ,function (error, result) {

        //потраченное время на загадку от захода до нажатие кнопки отгадать
        var now = new Date().getTime();
        var startTime = Session.get('startTime');
        var timeDiff = moment.duration(now - startTime);

        var timeMessege = '<span class="glyphicon glyphicon-time"></span> Время исследования: ' + timeDiff.minutes() + 'м:' + timeDiff.seconds() + 'с';

        var message = '<h2>Прочти еще раз!</h2><h3>' + timeMessege +'</h3>'
            ,title = '<h1>Не правильно!</h1>';

        var buttons = {
                cancel: {
                  label: '<span class="glyphicon glyphicon-repeat"></span> Вернуться к загадке'
                  ,className: "btn-default"
                  ,callback: function() {
                    if(result !== false) Session.set('wisdomAddition', '+' + result.wisdom);
                  }
                }
                ,overview: {
                  label: '<span class="glyphicon glyphicon-th-large"></span> Обзор эпизода'
                  ,className: "btn-info"
                  ,callback: function() {
                    if(result !== false) Session.set('wisdomAddition', '+' + result.wisdom);
                    Router.go('episode', { _id: template.data.episodeId});
                  }
                }
              }
        
        if( result !== false ) {

          message = '<h2>Правильно! Ты заработал: +' + result.wisdom + ' мудрости</h2><h3>' + timeMessege +'</h3>';
          title = '<h1>Правильно! Поздравляем!</h1>';
          _.extend(buttons, {
            next: {
                  label: '<span class="glyphicon glyphicon-chevron-right"></span> Следующая загадка'
                  ,className: "btn-success"
                  ,callback: function() {
                    Session.set('wisdomAddition', '+' + result.wisdom);
                    Router.go('riddle', { _episodeId: template.data.episodeId, _id: result.next });
                  }
                }
          });

        }

        bootbox.dialog({
          message: message
          ,title: title
          ,closeButton: false
          ,buttons: buttons
        });

      }
    )
    
  }
});


Template.riddle.onRendered(function () {

  //установка время начала отгадывания
  var now = new Date().getTime();
  Session.set('startTime', now);

  //загрузка текста первой главы
  var chapter = _.chain(this.data.chapters).strLeft(',').trim().value();
  var placeBible = this.data.books + chapter;

  var tabId = '#chapter0';

  HTTP.call("GET", "http://api.bibleonline.ru/bible.html", {params:{ q: placeBible }}, function(err, result){

    if(err){

      this.$(tabId + ' .bible-text').hide().html('<h3>Извините! Сервис текста из Библии не доступен.</h3><h4 class="text-warning">Ошибка: ' + err.message + '</h4>').slideDown();

    }else{

      this.$(tabId + ' .bible-text').hide().html(result.content).slideDown();
      
    }

    this.$(tabId + ' .progress').slideUp();
  })

});

//Первая буква в предложении большая
Template.registerHelper('ucFirst', function(str) {

  if(!str) return str;

  newStr = _.capitalize(str);

  return newStr;
});

//Падеж в числительных
Template.registerHelper('plurality', function(n, thing) {

  if (n === 1) {
    return '1 ' + thing + 'ь';
  } else {
    return n + ' ' + thing + 'и';
  }

});