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
    ,optional: true
  }
}));

//Автоматичекое добавление время создания и время обновления
Episodes.attachBehaviour('timestampable', {
  createdBy: false
  ,updatedBy: false
});