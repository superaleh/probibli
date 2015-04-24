Episodes = new Mongo.Collection('episodes');

Episodes.attachSchema(new SimpleSchema({
  title: {
    type: String
    ,label: "Название"
  }
  ,publish: {
    type: Boolean
    ,label: "Опубликовать"
    ,optional: true
    ,autoform: {
      type: "boolean-checkbox"
    }
  }
  ,numberRiddles: {
    type: Number
    ,label: "Количество загадок"
    ,defaultValue: 0
  }
}));

//Автоматичекое добавление время создания и время обновления
Episodes.attachBehaviour('timestampable', {
  createdBy: false
  ,updatedBy: false
});