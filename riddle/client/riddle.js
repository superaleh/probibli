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

    console.log(userResponse);

    Meteor.call('checkAnswer'
      ,userResponse
      ,idRiddle
      ,function (error,result) {
        console.log(result);
      }
    )
    
  }
});

//загрузка текста первой главы
Template.riddle.onRendered(function () {

  var chapter = _.chain(this.data.chapters).strLeft(',').trim().value();
  var placeBible = this.data.books + chapter;

  var tabId = '#chapter0';

  HTTP.call("GET", "http://api.bibleonline.ru/bible.html", {params:{ q: placeBible }}, function(err, result){
    this.$(tabId + ' .bible-text').hide().html(result.content).slideDown();
    this.$(tabId + ' .progress').slideUp();
  })

});

Template.registerHelper('ucFirst', function(str) {

  if(!str) return str;

  newStr = str.charAt(0).toUpperCase();

  for(i=1; i<str.length; i++) {
    newStr += str.charAt(i);
  };

  return newStr;
});

Template.registerHelper('plurality', function(n, thing) {

  if (n === 1) {
    return '1 ' + thing + 'ь';
  } else {
    return n + ' ' + thing + 'и';
  }

});