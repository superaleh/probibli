Template.newRiddle.events({

  'keyup .auto-input': function(e) {

    var inputVal = $(e.target).val(); // получаю строку из инпута

    // создаю шаблоны регулярок
    var pattern = {
      books: /([^!]((^|\s)\d)?\s?[а-я]+\.?)/ig //книга та у которой слева всоклицательынй знак
      ,chapters: /(\d+(:|\.))|([^,]\s\d+$)/g //глава та у которой справа точка или двоеточие
      ,verses: /((:|\.)\d+)|(,\s?\d+)/g //стих тот у которого слева точка, запятая или двоеточие
    }

    // ищу все книги
    var books = inputVal.match(pattern.books);

    // если книг нет то выхожу
    if ( books === null )
      return;

    // создаю пустой массив результативных облостей поиска
    var scopesSearch = [];
    
    // прохожу по массиву найденых книг
    books.forEach(function (book, index, books) {

      // ищу индекс вхождения текущей книги
      var scopeIndexStart = inputVal.indexOf(book[index]) -1;
      // если существует последующая книга то конечный индекс начало последующей книги, иначе конечный индекс конец строки
      var scopeIndexEnd = books[index + 1] ? inputVal.indexOf(books[index + 1]) : inputVal.length;

      // обрезаю строку по начальному и конечному индексу
      var scope = inputVal.slice(scopeIndexStart, scopeIndexEnd);

      // нахожу текст книги
      var bookText = pattern.books.exec(scope);
      // сбрасываю индекс у регулярки, чтобы на следующей итерации поиск начался сначала
      pattern.books.lastIndex = 0;

      // очищаю текст книги
      var cleanBook = _.clean(bookText[0]);

      var chapter;
      // ищу все главы в данной области
      while((chapter = pattern.chapters.exec(scope)) !== null){

        // очищаю текст главы
        var cleanChapter = chapter[0].replace(/[^\d]/g, '');

        // добавляю в область поиска одну книгу и одну главу
        scopesSearch.push( cleanBook + ' ' + cleanChapter);

      }

    })

    console.log(scopesSearch);

  }

})