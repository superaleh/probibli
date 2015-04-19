Template.riddleAnswer.events({

  'click .actions .correct-transition': function(e) {

    e.preventDefault();

    var routerName = $(e.target).data('router');
    var settings = $(e.target).data('settings');
    var episodeId = this.episodeId;
    var delay = 700;

    if(routerName === 'episode'){

      Meteor.setTimeout(function() {
        Router.go( routerName, { _episodeId: episodeId } );
        // Router.next();
      }, delay);

    }else if(routerName === 'riddle'){

      Meteor.setTimeout(function() {
        Router.go( routerName, { _riddleId: settings, _episodeId: episodeId } );
        // Router.next();
      }, delay);

    }

  }
  ,'keypress form.string input': function(e) {
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
    var actionsSegment = $(e.target).parents().find('.basic.modal .actions .segment .dimmer');

    var pastorMode = false;    
    if (Meteor.user().pastor && Session.get('pastorMode'))
      pastorMode = true;

    //включаею на кнопке загрузку
    formButton.addClass('loading');
    actionsSegment.addClass('active');

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
              //останавливаем счетчик
              timeCircle.stop();

              Meteor.setTimeout(function() {
                actionsSegment.removeClass('active');
              }, 1000);
            }
            ,onHidden : function(){
              //запускаем счетчик
              timeCircle.start();
            }
          })
          .modal('show');

      }, 700);

    });

  }

});