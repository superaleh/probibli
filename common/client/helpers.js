/*
#версия приложения
 */
Template.registerHelper('varsion', function() {
  return '0.5.7';
});

/*
#режим пастора
 */
Template.registerHelper('pastorMode', function() {

  if ( Meteor.user() ){
    var pastorMode = Session.get('pastorMode');

    if (Meteor.user().pastor && pastorMode)
      return true;

    return false;
  };

  return false;

});

/*
# Относительное время
 */
Template.registerHelper('fromNow', function( data ) {
  if ( data )
    return moment( data ).fromNow();
  return false;
});


/*
#Первая буква в предложении большая
 */
Template.registerHelper('ucFirst', function(str) {
  var newStr;
  if (!str) {
    return str;
  }
  newStr = lodash.capitalize(str);
  return newStr;
});


/*
#Окончание в числительных
 */
Template.registerHelper('plurality', function(n, thing) {
  if (n === 1) {
    return n + ' ' + thing + 'ь';
  } else {
    return n + ' ' + thing + 'и';
  }
});

/*
#для дебага переменных шаблона
 */
Template.registerHelper('print', function(obj) {
  return console.log('TEMPLATE DEBUG: type:', typeof obj, 'val:', obj);
});

Template.registerHelper('equal', function(obj1, obj2) {
  return obj1 === obj2;
});

Template.registerHelper('notequal', function(obj1, obj2) {
  return !(obj1 === obj2);
});

Template.registerHelper('collectionIsEmpty', function(col) {
  var error, error_flag, obj;
  error_flag = false;
  try {
    col.fetch();
  } catch (_error) {
    error = _error;
    obj = col;
    error_flag = true;
  }
  if (!error_flag) {
    obj = col.fetch();
  }
  return !obj.length;
});
