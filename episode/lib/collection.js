Episodes = new Mongo.Collection('episodes');

Episodes.attachSchema(new SimpleSchema({
  title: {
    type: String
    ,label: "Название"
  }
  ,description: {
    type: String
    ,label: "Описание"
    ,optional: true
  }
  ,period: {
    type: String
    ,label: "Период"
    ,optional: true
  }
  ,image: {
    type: String
    ,label: "Картинка"
    ,optional: true
  }
  ,epoch: {
    type: String
    ,label: "Эпоха" // придумать названия 7ми эпох на латинице, может 3 первые буквы
    ,optional: true
  }
  ,numberRiddles: {
    type: Number
    ,label: "Количество загадок"
    ,min: 0
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
