Template.searchArea.helpers({
  placesBibleText: function() {
    /*
    #формирование массива с главами, пока только сделал при одной книге (сделать когда несколько книг)
     */
    var books, chapters, placesBible, riddle;
    riddle = Riddles.findOne();
    books = riddle.books;
    chapters = riddle.chapters;
    placesBible = _.chain(chapters).words(',').map(function(chapter, index) {
      return {
        id: index,
        place: books + ' ' + lodash.trim(chapter),
        active: index ? '' : 'active'
      };
    }).value();
    return placesBible;
  }
  ,selectedVersesCount: function() {
    var enableVersesUser = Session.get('enableVerses');
    return enableVersesUser.length;
  }
});