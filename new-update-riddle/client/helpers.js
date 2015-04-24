Template.newRiddle.helpers({
  settings: function() {
    return {
      position: "bottom"
      ,limit: 5
      ,rules: [
        {
          collection: Books
          ,token: '!'
          ,matchAll: true
          ,field: "name"
          ,template: Template.userPill
        }
      ]
    };
  }
});