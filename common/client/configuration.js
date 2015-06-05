Meteor.startup(function() {
  AutoForm.setDefaultTemplate("semanticUI");
  Tinycon.setOptions({
      width: 7,
      height: 9,
      font: '10px arial',
      colour: '#ff695e',
      background: '#333333',
      fallback: true
  });
});
