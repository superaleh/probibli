Template.riddle.helpers({
  titleEpisode: function() {
    episode = Episodes.findOne();
    return episode.title;
  }
  ,idEpisode: function() {
    episode = Episodes.findOne();
    return episode._id;
  }
  ,placesBible: function() {
    riddle = Riddles.findOne();
    books = riddle.books;
    chapters = riddle.chapters;
    placesBible = _.chain(chapters)
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

Template.riddle.onRendered(function () {
  if(Session.get('placeBible')){
    placeBible = Session.get('placeBible');
  }else{
    riddle = Riddles.findOne();
    placeBible = riddle.books + riddle.chapters;
  }
  
  HTTP.call("GET", "http://api.bibleonline.ru/bible.html", {params:{ q: placeBible }}, function(err, result){
    this.$('#chapter0 .bible-text').hide().html(result.content).slideDown();
    this.$('#chapter0 .progress').slideUp();
  })
});

Template.riddle.events({
  'click .bible-chapter-tab a': function(e, template) {
    e.preventDefault();

    if( $(e.target).parent().hasClass('in active') ) return; //если вкладка активна то выходим

    placeBible = $(e.target).text();
    tabId = $(e.target).attr("href");

    if($(tabId + ' .bible-text').html()) return; //если текс во вкладку уже загружался то выходим
    
    HTTP.call("GET", "http://api.bibleonline.ru/bible.html", {params:{ q: placeBible }}, function(err, result){
      this.$(tabId + ' .bible-text').hide().html(result.content).slideDown();
      this.$(tabId + ' .progress').slideUp();
    })
  }
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