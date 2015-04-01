Meteor.publish('singleRiddle', function(idRiddle) {
  check(idRiddle, String);
  return Riddles.find({_id: idRiddle});
});

Meteor.methods({getBibleText: function (placeBible) {
  try {
    var result = HTTP.call("GET", "http://api.bibleonline.ru/bible.html?q=jn2");
    console.log(result.content)
    return result.content;
  } catch (e) {
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    return false;
  }
}});