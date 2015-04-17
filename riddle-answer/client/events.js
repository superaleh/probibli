Template.riddleAnswer.events({
  'click .options .toggle.button': function(e, template) {
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

    var response = $(e.target).find('input[name=response-user]').val();

    response = _.chain(response).clean().value().toLowerCase();

    var verses = EJSON.parse( Session.get('enableVerses') ).join('');

    var userResponse = response + verses;

    Meteor.call('checkAnswer', userResponse, idRiddle, function(error, result) {

      Session.set('checkAnswer', result);

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
        .modal('toggle')
      ;

    });
  }
});