Template.autoForm.events({

  'keyup .smart-input': function(e) {

    var inputVal = $(e.target).val(); // получаю строку из инпута
    var scopeSearch = $(e.target).parents().find('.scope-search');
    var correctVerses = $(e.target).parents().find('.correct-verses');
    var versesCount = $(e.target).parents().find('.verses-count');
    var smartInputOut = $(e.target).parents().find('.smart-input-out');

    // записываю строку в инпут для записи в базу
    smartInputOut.val(inputVal);

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
    var scopesSearchResult = [];
    
    // прохожу по массиву найденых книг
    books.forEach(function (book, index, booksArr) {

      // ищу индекс вхождения текущей книги
      var scopeIndexStart = inputVal.indexOf(book) -1;
      // если существует последующая книга то конечный индекс начало последующей книги, иначе конечный индекс конец строки
      var scopeIndexEnd = booksArr[index + 1] ? inputVal.indexOf(booksArr[index + 1]) : inputVal.length;

      // обрезаю строку по начальному и конечному индексу
      var scope = inputVal.slice(scopeIndexStart, scopeIndexEnd);

      // очищаю текст книги
      var cleanBook = _.clean(book);

      var chapter;
      // прохожу по каждой главе в данной области
      while((chapter = pattern.chapters.exec(scope)) !== null){

        // очищаю текст главы
        var cleanChapter = chapter[0].replace(/[^\d]/g, '');

        // добавляю в область поиска одну книгу и одну главу
        scopesSearchResult.push( cleanBook + ' ' + cleanChapter);

      }

    })

    scopeSearch.val( EJSON.stringify(scopesSearchResult) );

    // ищу все главы
    var chapters = inputVal.match(pattern.chapters);

    // если глав нет то выхожу
    if ( chapters === null )
      return;

    // создаю пустой массив результативных правильных стихов
    var correctVersesResult = [];
    
    // прохожу по массиву найденых книг
    chapters.forEach(function (chapter, index, chaptersArr) {

      // ищу индекс вхождения текущей главы
      var scopeIndexStart = inputVal.indexOf(chapter) -1;
      // если существует последующая глава то конечный индекс начало последующей главы, иначе конечный индекс - конец строки
      var scopeIndexEnd = chaptersArr[index + 1] ? inputVal.indexOf(chaptersArr[index + 1]) : inputVal.length;

      // обрезаю строку по начальному и конечному индексу
      var scope = inputVal.slice(scopeIndexStart, scopeIndexEnd);

      // очищаю текст главы
      var cleanChapter = chapter.replace(/[^\d]/g, '');

      var verse;
      // прохожу по каждому стиху в данной области
      while((verse = pattern.verses.exec(scope)) !== null){

        // очищаю текст стиха
        var cleanVerses = verse[0].replace(/[^\d]/g, '');

        // добавляю в правельные стихи одну главу и один стих
        correctVersesResult.push( cleanChapter + ':' + cleanVerses);

      }

    })

    if ( correctVersesResult.length !== 0){

      correctVerses.val( EJSON.stringify(correctVersesResult) );
      // записываю количество стихов в инпут обязательные стихи
      versesCount.val( correctVersesResult.length );

    }


  }

})