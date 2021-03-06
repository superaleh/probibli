GuessRiddles = new Mongo.Collection('guessRiddles');

GuessRiddles.attachSchema(new SimpleSchema({
  researcherId: {
    type: String
    ,label: "ID исследователя"
  }
  ,episodeId: {
    type: String
    ,label: "ID эпизода"
  }
  ,riddleId: {
    type: String
    ,label: "ID загадки"
  }
  ,createdAt: {
    type: Date
    ,label: "Дата отгадывания"
  }
  ,updatedAt: {
    type: Date
    ,label: "Дата обновления"
  }
  ,sins: {
    type: Number
    ,label: "Количество грехов"
  }
}));

//Автоматичекое добавление время создания и время обновления
GuessRiddles.attachBehaviour('timestampable', {
  createdBy: 'researcherId'
  ,updatedBy: false
});
