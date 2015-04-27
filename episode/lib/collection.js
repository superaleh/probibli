Episodes = new Mongo.Collection('episodes');

Episodes.attachSchema(new SimpleSchema({
  title: {
    type: String
    ,label: "Название"
  }
  ,numberRiddles: {
    type: Number
    ,label: "Количество загадок"
    ,min: 0
    ,optional: true
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
Episodes.attachBehaviour('timestampable', {
  createdBy: false
  ,updatedBy: false
});