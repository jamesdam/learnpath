var modelProvider = require('../models/model').instance;

exports.tutorial = function(req, res) {
  var tutorialId = req.params.tid;

  var tut = {
    id: tutorialId,
    title: 'NodeJS web basic',
    createdBy: 'Hung Doan',
    star: 5,
    desc: "In this tutorial I will run you through the process setting up an Express.js app and making it do what a basic website might do. You will learn the basics of routes, views, Jade templates, Stylus CSS engine, handling POST and GET requests.",
    url: 'http://www.hacksparrow.com/express-js-tutorial.html',
    stat: {
      likes: 103,
      shares: 50,
      views: 1042
    },
    requires: [
      'javascript-basic',
      'nodejs-basic',
      'javascript',
      'nodejs',
    ],
    acquires: [
      'nodejs-intermediate',
      'expressjs-basic',
      'nodejs-basic',
      'javascript',
    ],
    comments: [
    {poster: 
      {name: 'Hung Doan',
      profile_url: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/371019_697811725_247259128_q.jpg'},
        content: 'Hello world!'}
        ]
    };  
  if (!tutorialId) {
    res.send("Error");
  } else {
    // fetch tutorial based on id
    modelProvider.findTutorialById (tutorialId , function (err, tutorial){
      if (err != null)
        res.send(err)
      console.log(tutorial);
      tut.id = tutorial.id;
      tut.title = tutorial.name;
      tut.desc = tutorial.description;
      tut.url  = tutorial.content;
      res.render('tutorial', {
        title: tut.title,
        tut: tut
    });

  })  
  }
}


exports.newTutorial = function(req, res){
  console.log("new tut ");
  res.render('new_tut', {});
};

exports.postNewTutorial = function(req, res){
 var tut = {};
  tut.name = req.body.title;
  tut.description = req.body.description;
  tut.author = req.body.author;
  tut.content = req.body.url;
  tut.imageUrl = req.body.imageUrl;
  tut.enableTopics = req.body.acquires;
  tut.requiredTopics = req.body.requires;
  modelProvider.createTutorial(tut, function(err, tut_id) {
    var title;
    if (err) 
      title = err;
    else
      title = tut_id;
    res.redirect('/tutorial/'+tut_id);
  });

};

exports.postTutorialComment = function(req, res){

  var comment = req.body.comment;
  var tutorialId  = req.params.tid;
  console.log("comment " + comment + " tutorial id " +tutorialId);
  res.send("respond with a resource");
};


exports.postTutorialLike = function(req, res){

  var comment = req.body.comment;
  var tutorialId  = req.params.tid;
  console.log("comment " + comment + " tutorial id " +tutorialId);
  res.send("respond with a resource");
};


exports.postTutorialShare = function(req, res){

  var comment = req.body.comment;
  var tutorialId  = req.params.tid;
  console.log("comment " + comment + " tutorial id " +tutorialId);
  res.send("respond with a resource");
};

