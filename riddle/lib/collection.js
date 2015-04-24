Riddles = new Mongo.Collection('riddles');

Riddles.attachSchema(new SimpleSchema({
  episodeId: {
    type: String
    ,label: "ID Эпизода"
    ,optional: true
  }
  ,smartInput: {
    type: String
    ,label: "Умная строка"
    ,optional: true
  }
  ,scopeSearch: {
    type: String
    ,label: "Область поиска"
  }
  ,correctVerses: {
    type: String
    ,label: "Стихи ответы"
    ,optional: true
  }
  ,question: {
    type: String
    ,label: "Вопрос"
  }
  ,response: {
    type: String
    ,label: "Ответ"
  }
  ,falseResponse: {
    type: String
    ,label: "Ложные ответы"
    ,optional: true
  }
  ,versesCount: {
    type: Number
    ,label: "Обязательных стихов"
  }
  ,intricacy: {
    type: Number
    ,label: "Сложность"
  }
  ,position: {
    type: Number
    ,label: "Позиция"
  }
  ,createdAt: {
    type: Date
    ,label: "Дата создания"
  }
  ,updatedAt: {
    type: Date
    ,label: "Дата обновления"
    ,optional: true
  }
  ,publish: {
    type: Boolean
    ,label: "Опубликовать"
    ,optional: true
  }
}));

//Автоматичекое добавление время создания и время обновления
Riddles.attachBehaviour('timestampable', {
  createdBy: false
  ,updatedBy: false
});