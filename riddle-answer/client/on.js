Template.riddleAnswer.onRendered(function() {
  Meteor.setTimeout(function() {

    var validationRulesNumber, validationRulesOptions, validationRulesString;
    var formString = this.$('.ui.form.string')
        ,formNumber = this.$('.ui.form.number')
        ,formOptions = this.$('.ui.form.options');

    this.$('.ui.radio.checkbox').checkbox();

    validationRulesString = {
      string: {
        identifier: 'response-user'
        ,rules: [
          {
            type: 'empty'
            ,prompt: 'Пожалуйста введи текст'
          }
        ]
      }
    };
    formString.form(validationRulesString, {
      inline: true
      ,on: 'blur'
    });

    validationRulesNumber = {
      number: {
        identifier: 'response-user'
        ,rules: [
          {
            type: 'integer'
            ,prompt: 'Пожалуйста введи число'
          }
        ]
      }
    };
    formNumber.form(validationRulesNumber, {
      inline: true
      ,on: 'blur'
    });

    validationRulesOptions = {
      options: {
        identifier: 'response-user'
        ,rules: [
          {
            type: 'empty'
            ,prompt: 'Пожалуйста выбери один вариант'
          }
        ]
      }
    };
    formOptions.form(validationRulesOptions);

  }, 200);

});