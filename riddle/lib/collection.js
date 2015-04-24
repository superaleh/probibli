Riddles = new Mongo.Collection('riddles');

Riddles.attachSchema(new SimpleSchema({
  question: {
    type: String
    ,label: "Вопрос"
    ,autoform: {
      type: "textarea"
    }
  }
  ,episodeId: {
    type: String
    ,label: "ID Эпизода"
  }
  ,books: {
    type: String
    ,label: "Книги"
  }
  ,chapters: {
    type: Number
    ,label: "Главы"
  }
  ,response: {
    type: String
    ,label: "Ответ"
  }
  ,falseResponse: {
    type: String
    ,label: "Ложные ответы"
  }
  ,versesResponse: {
    type: String
    ,label: "Стихи ответы"
  }
  ,versesCount: {
    type: Number
    ,label: "Число стихов для ответа"
  }
  ,intricacy: {
    type: Number
    ,label: "Сложность"
  }
  ,position: {
    type: Number
    ,label: "Позиция"
  }
  ,publish: {
    type: Boolean
    ,label: "Опубликовать"
    ,optional: true
    ,autoform: {
      type: "boolean-checkbox"
    }
  }
}));

//Автоматичекое добавление время создания и время обновления
Riddles.attachBehaviour('timestampable', {
  createdBy: false
  ,updatedBy: false
});