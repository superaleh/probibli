Template.riddle.helpers({
  bibleText: function() {
    var bibleText;
    bibleText = ReactiveMethod.call("getBibleText", "jn2");
    return bibleText;
  }
});

Template.registerHelper('ucFirst', function(str) {

  if(!str) return str;

  var newStr = str.charAt(0).toUpperCase();

  for(var i=1; i<str.length; i++) {
    newStr += str.charAt(i);
  };

  return newStr;
});

Template.registerHelper('plurality', function(n, thing) {

  if (n === 1) {
    return '1 ' + thing + 'ь';
  } else {
    return n + ' ' + thing + 'и';
  }

});