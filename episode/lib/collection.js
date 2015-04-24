Episodes = new Mongo.Collection('episodes');

Episodes.attachSchema(new SimpleSchema({
  title: {
    type: String
    ,label: "Название"
  }
  ,numberRiddles: {
    type: Number
    ,label: "Количество загадок"
    ,defaultValue: 0
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
    ,autoform: {
      type: "boolean-checkbox"
    }
  }
}));

//Автоматичекое добавление время создания и время обновления
Episodes.attachBehaviour('timestampable', {
  createdBy: false
  ,updatedBy: false
});