Template.riddleAnswer.events({

  'click .actions .curren-episode-url': function(e) {

    //переход не осуществлялся из-за того, что событие срабатовало на дочернем елементе а у него не было данных для редиректа
    e.preventDefault();

    var episodeId = this.episodeId;

    Meteor.setTimeout(function() {
      Router.go( 'episode', { _episodeId: episodeId } );
    }, 700);

  }
  ,'click .actions .next-riddle-url': function(e) {

    e.preventDefault();

    var nextRiddle = $(e.currentTarget).data('next');
    var episodeId = this.episodeId;

    Meteor.setTimeout(function() {
      Router.go( 'riddle', { _riddleId: nextRiddle, _episodeId: episodeId } );
    }, 700);

  }
  ,'keyup form.string input, focus form.string input, blur form.string input': function(e) {
    var form = $(e.target).parents().find('form.string');
    var words = lodash.words( form.form('get value', 'response-user'), /[а-я\d]+/ig );
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
  ,'submit form.ui.form.check-answer': function(e, template) {

    e.preventDefault();

    var idRiddle = this._id;
    var timeCircle = $(e.target).parents().find('.time-circle').TimeCircles();
    var formButton = $(e.target).find('.submit.button');

    var pastorMode = false;
    if (Meteor.user().pastor && Session.get('pastorMode'))
      pastorMode = true;

    //включаю на кнопке загрузку
    formButton.addClass('loading');

    var response = $(e.target).find('input[name=response-user]').val();

    var userResponse = lodash.chain(response).trim().value().toLowerCase();

    var userVerses = Session.get('enableVerses');

    Meteor.call('checkAnswer', userResponse, userVerses, idRiddle, pastorMode, function(error, result) {

      if(error){
        console.error(error);
        return;
      }

      Session.set('checkAnswer', result);

      Meteor.setTimeout(function() {

        //отключаю на кнопке загрузку
        formButton.removeClass('loading');

        $('.basic.modal')
          .modal({
            context : '.riddle-answer'
            ,closable : false
            ,transition : 'vertical flip'
            ,onShow : function(){
              //останавливаю счетчик
              timeCircle.stop();

            }
            ,onHidden : function(){
              //запускаю счетчик
              timeCircle.start();
            }
          })
          .modal('show');

      }, 700);

    });

  }

});
