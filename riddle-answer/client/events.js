Template.riddleAnswer.events({
  'keypress form.string input': function(e) {

    var form = $(e.target).parents().find('form.string');
    var words = lodash.words( form.form('get value', 'response-user'), /[а-яА-Я]+/g );
    Session.set('countWordsResponse', words.length);
    
  }
  ,'click .options .toggle.button': function(e, template) {
    e.preventDefault();
    var formOptions = $(e.target).parents('form.ui.form.options');

    formOptions.find('.toggle.button').removeClass('active');
    $(e.target).addClass('active');

    var response = $(e.target).text();
    formOptions.find('input[name=response-user]').val(response);

  }
  ,'submit form.ui.form': function(e, template) {

    e.preventDefault();
    
    var idRiddle = this._id;
    var timeCircle = $(e.target).parents().find('.time-circle').TimeCircles();
    var formButton = $(e.target).find('.submit.button');

    //включаею на кнопке загрузку
    formButton.addClass('loading');

    var response = $(e.target).find('input[name=response-user]').val();

    var userResponse = lodash.chain(response).trim().value().toLowerCase();

    var userVerses = Session.get('enableVerses');

    Meteor.call('checkAnswer', userResponse, userVerses, idRiddle, function(error, result) {

      if(error){
        console.error(error);
        return;
      }

      Session.set('checkAnswer', result);

      Meteor.setTimeout((function() {

        //отключаю на кнопке загрузку
        formButton.removeClass('loading');

        $('.basic.modal')
          .modal({
            context : '.riddle-answer'
            ,closable : false
            ,transition : 'vertical flip'
            ,onShow : function(){
              //останавливаем счетчик
              timeCircle.stop();
            }
            ,onHidden : function(){
              //запускаем счетчик
              timeCircle.start(); 
            }
          })
          .modal('show');

      }), 500);

    });
  }
});