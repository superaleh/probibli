Support = new Mongo.Collection('support');

Support.attachSchema(new SimpleSchema({
  riddleId: {
    type: String
    ,label: "ID Загадки"
  }
  ,riddleQuestion: {
    type: String
    ,label: "Вопрос"
  }
  ,createdBy: {
    type: String
    ,label: "ID исследователя"
  }
  ,researcherName: {
    type: String
    ,label: "Никнейм Исследователя"
  }
  ,message: {
    type: String
    ,label: "Сообщение"
  }
  ,createdAt: {
    type: Date
    ,label: "Дата создания"
  }
}));

//Автоматичекое добавление время создания
Support.attachBehaviour('timestampable', {
  updatedBy: false
  ,updatedAt: false
});
