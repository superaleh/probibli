Supports = new Mongo.Collection('supports');

Supports.attachSchema(new SimpleSchema({
  episodeId: {
    type: String
    ,label: "ID Эпизода"
  }
  ,riddleId: {
    type: String
    ,label: "ID Загадки"
  }
  ,riddleQuestion: {
    type: String
    ,label: "Вопрос"
  }
  ,riddleIntricacy: {
    type: Number
    ,label: "Сложность"
  }
  ,solved: {
    type: Boolean
    ,label: "Решен"
  }
  ,createdBy: {
    type: String
    ,label: "ID исследователя"
  }
  ,researcherName: {
    type: String
    ,label: "Никнейм Исследователя"
  }
  ,researcherCity: {
    type: String
    ,label: "Город Исследователя"
  }
  ,createdAt: {
    type: Date
    ,label: "Дата создания"
  }
  ,body: {
    type: String
    ,label: "Сообщение"
  }
  ,messageCount: {
    type: Number
    ,label: "Количество сообщений"
  }
  ,seen: {
    type: String
    ,label: "Просмотрено"
  }
}));

Supports.attachBehaviour('timestampable', {
  updatedBy: false
  ,updatedAt: false
});

Messages = new Mongo.Collection('messages');

Messages.attachSchema(new SimpleSchema({
  body: {
    type: String
    ,label: "Текст"
  }
  ,createdAt: {
    type: Date
    ,label: "Дата создания"
  }
  ,createdBy: {
    type: String
    ,label: "ID создавшего"
  }
  ,supportId: {
    type: String
    ,label: "ID обращения"
  }
}));

Messages.attachBehaviour('timestampable', {
  updatedBy: false
  ,updatedAt: false
});
