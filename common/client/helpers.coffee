#Первая буква в предложении большая
Template.registerHelper 'ucFirst', (str) ->
  if !str
    return str
  newStr = _.capitalize(str)
  newStr

#Окончание в числительных
Template.registerHelper 'plurality', (n, thing) ->
  if n == 1
    '1 ' + thing + 'ь'
  else
    n + ' ' + thing + 'и'