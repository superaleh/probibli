Template.riddleAnswer.onDestroyed(function() {
  Session.set('checkAnswer', false);
  Session.set('countWordsResponse', 0);
})

Template.riddleAnswer.onCreated(function() {
  Session.set('checkAnswer', false);
  Session.set('countWordsResponse', 0);
})

Template.riddleAnswer.onRendered(function() {

  Meteor.setTimeout(function() {


    this.$(".time-circle").TimeCircles({
        "animation": "ticks",
        "bg_width": 0.12,
        "fg_width": 0.04,
        "circle_bg_color": "#fff",
        "time": {
            "Days": {
                "text": "ДНИ",
                "color": "#FFCC66",
                "show": false
            },
            "Hours": {
                "text": "ЧАСЫ",
                "color": "#99CCFF",
                "show": false
            },
            "Minutes": {
                "text": "МИНУТЫ",
                "color": "#f2c61f",
                "show": true
            },
            "Seconds": {
                "text": "СЕКУНДЫ",
                "color": "#d9499a",
                "show": true
            }
        }
    });

    var validationRulesNumber, validationRulesOptions, validationRulesString;
    var formString = this.$('.ui.form.string')
        ,formNumber = this.$('.ui.form.number')
        ,formOptions = this.$('.ui.form.options');

    this.$('.ui.accordion').accordion();

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
      on: 'blur'
      ,inline: true
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
      on: 'blur'
      ,inline: true
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
