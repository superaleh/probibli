riddlesSamson = [
  {
    "FIELD1":"bz0037",
    "FIELD2":"Суд.",
    "FIELD3":"16",
    "FIELD4":"RST",
    "FIELD5":"какая прическа была у Самсона?",
    "FIELD6":"7 кос",
    "FIELD7":"",
    "FIELD8":"16:13",
    "FIELD9":1
  },
  {
    "FIELD1":"bz0040",
    "FIELD2":"Суд.",
    "FIELD3":"14",
    "FIELD4":"RST",
    "FIELD5":"сколько человек отгадывали загадку Самсона?",
    "FIELD6":"30 человек",
    "FIELD7":"",
    "FIELD8":"14:11",
    "FIELD9":1
  },
  {
    "FIELD1":"bz0228",
    "FIELD2":"Суд.",
    "FIELD3":"16",
    "FIELD4":"RST",
    "FIELD5":"названа ли Далида блудницей в Библии?",
    "FIELD6":"нет",
    "FIELD7":"да, 100%",
    "FIELD8":"16:4",
    "FIELD9":1
  },
  {
    "FIELD1":"bz0229",
    "FIELD2":"Суд.",
    "FIELD3":"16",
    "FIELD4":"RST",
    "FIELD5":"где жила Далида?",
    "FIELD6":"равнина Сорек",
    "FIELD7":"",
    "FIELD8":"16:4",
    "FIELD9":1
  },
  {
    "FIELD1":"bz0230",
    "FIELD2":"Суд.",
    "FIELD3":"14",
    "FIELD4":"RST",
    "FIELD5":"в какой местности был мёд? или на какой территории.",
    "FIELD6":"в винограднике",
    "FIELD7":"",
    "FIELD8":"14:5",
    "FIELD9":1
  },
  {
    "FIELD1":"bz0231",
    "FIELD2":"Суд.",
    "FIELD3":"16",
    "FIELD4":"RST",
    "FIELD5":"Сколько денег дали Далиде?",
    "FIELD6":"каждый владелец Фелистимский по тысяче сто сикелей серебра",
    "FIELD7":"",
    "FIELD8":"16:5",
    "FIELD9":1
  },
  {
    "FIELD1":"bz0232",
    "FIELD2":"Суд.",
    "FIELD3":"14, 15",
    "FIELD4":"RST",
    "FIELD5":"сколько убил Самсон филистимлян до потери своей силы?",
    "FIELD6":"1030",
    "FIELD7":"",
    "FIELD8":"14:19; 15:15",
    "FIELD9":2
  },
  {
    "FIELD1":"bz0233",
    "FIELD2":"Суд.",
    "FIELD3":"15",
    "FIELD4":"RST",
    "FIELD5":"сколько факелов использовал Самсон чтобы спалить поля Фелистимлян?",
    "FIELD6":"150 факелов",
    "FIELD7":"",
    "FIELD8":"15:4",
    "FIELD9":2
  },
  {
    "FIELD1":"bz0234",
    "FIELD2":"Суд.",
    "FIELD3":"15",
    "FIELD4":"RST",
    "FIELD5":"сколько человек входит в одну толпу?",
    "FIELD6":"333 чел",
    "FIELD7":"",
    "FIELD8":"15:16",
    "FIELD9":2
  },
  {
    "FIELD1":"bz0235",
    "FIELD2":"Суд.",
    "FIELD3":"14, 15",
    "FIELD4":"RST",
    "FIELD5":"сколько раз Самсон был в Фемнафе?",
    "FIELD6":"4 раза",
    "FIELD7":"",
    "FIELD8":"14:1 14:5 14:8 14:9 14:10 15:1",
    "FIELD9":2
  },
  {
    "FIELD1":"bz0236",
    "FIELD2":"Суд.",
    "FIELD3":"14, 15, 16",
    "FIELD4":"RST",
    "FIELD5":"где Самсон убил больше всего людей?",
    "FIELD6":"в Газе",
    "FIELD7":"",
    "FIELD8":"16:21",
    "FIELD9":2
  },
  {
    "FIELD1":"bz0237",
    "FIELD2":"Суд.",
    "FIELD3":"15, 16",
    "FIELD4":"RST",
    "FIELD5":"сколько всего раз связывали тело Самсона?",
    "FIELD6":"3 раза",
    "FIELD7":"",
    "FIELD8":"15:13 16:8 16:12",
    "FIELD9":2
  },
  {
    "FIELD1":"bz0238",
    "FIELD2":"Суд.",
    "FIELD3":"16",
    "FIELD4":"RST",
    "FIELD5":"почему Самсон ничего не заподозрил, когда Далида 3 раза выпытывала?",
    "FIELD6":"т.к. никто не прибегал из флистимлян.и он думал что это шутка Далиды.",
    "FIELD7":"",
    "FIELD8":"",
    "FIELD9":2
  },
  {
    "FIELD1":"bz0239",
    "FIELD2":"Суд.",
    "FIELD3":"14",
    "FIELD4":"RST",
    "FIELD5":"Разгадать нестыковку с днями пира и днями отгадывания загадки Самсона?",
    "FIELD6":"подготовка к пиру 7 дней, а потом пир 7 дней",
    "FIELD7":"",
    "FIELD8":"14:12 14:14 14:15 14:17",
    "FIELD9":3
  }
];

if (Riddles.find().count() === 0) {

  var now = new Date().getTime();

  var episodeId = Episodes.insert({
    title: "История Самсона"
    ,creating: now
    ,update: now
  })

  _.each(riddlesSamson, function(value, key, list){
  
    Riddles.insert({
      episodeId: episodeId
      , idBz: value.FIELD1
      , books: value.FIELD2
      , chapters: value.FIELD3
      , translation: value.FIELD4
      , question: value.FIELD5
      , response: value.FIELD6
      , falseResponse: value.FIELD7
      , versesResponse: value.FIELD8
      , intricacy: value.FIELD9
    });
  
  });

}