/*
#Первая буква в предложении большая
 */
Template.registerHelper('ucFirst', function(str) {
  var newStr;
  if (!str) {
    return str;
  }
  newStr = _.capitalize(str);
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