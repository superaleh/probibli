/*
#версия приложения
 */
Template.registerHelper('varsion', function() {
  return '0.6.8';
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
#Окончание в числительных, в слове "мудрость"
 */
Template.registerHelper('plurality', function(n, thing) {
  if (n === 1) {
    return n + ' ' + thing + 'ь';
  } else {
    return n + ' ' + thing + 'и';
  }
});

/*
#Окончание в грехах  */
Template.registerHelper('sinEnding', function(n) {
  function declOfNum(number, titles) {  
    var cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
  }

    return n + declOfNum(n, [' грех', ' греха', ' грехов']);
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
