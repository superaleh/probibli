Template.searchArea.helpers
  placesBibleText: ->
    #формирование массива с главами, пока только сделал при одной книге (сделать когда несколько книг)
    riddle = Riddles.findOne()
    books = riddle.books
    chapters = riddle.chapters
    placesBible = _.chain(chapters).words(',').map((chapter, index) ->
      {
        id: index
        place: books + ' ' + _.trim(chapter)
        active: if index then '' else 'in active'
      }
    ).value()
    placesBible