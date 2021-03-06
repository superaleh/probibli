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
  ,help: {
    type: String
    ,label: "Справка"
    ,optional: true
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
    ,min: 0
  }
  ,intricacy: {
    type: Number
    ,label: "Сложность"
    ,min: 0
  }
  ,position: {
    type: Number
    ,label: "Позиция"
    ,min: 1
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
}));

//Автоматичекое добавление время создания и время обновления
Riddles.attachBehaviour('timestampable', {
  createdBy: false
  ,updatedBy: false
});
