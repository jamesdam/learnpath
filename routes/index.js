var ModelProvider = require('../models/model').ModelProvider;
var mongoose = require('mongoose');
var modelProvider = new ModelProvider(mongoose, '/localhost', 27017);
/*
 * GET home page.
 */

exports.index = function(req, res) {
  if (!req.user) {
    res.render('index', { title: 'Express' });
  } else {
    res.render('index', { title: 'Hello ' + req.user });
  }
};

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
          {poster: {name: 'Hung Doan',
                    profile_url: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/371019_697811725_247259128_q.jpg'},
          content: 'Hello world!'}
      ]
    };
  if (!tutorialId) {
    res.send("response with a resource");
  } else {

        // fetch tutorial based on id
    modelProvider.findTutorialById (tutorialId , function (err, tutorial){
        console.log(tutorial);
        tut.id = tutorial.id;
        tut.title = tutorial.name;
        tut.desc = tutorial.desc;
        tut.url  = tutorial.content;
        res.render('tutorial', {
          title: tut.title,
          tut: tut
    });

    })



  }
}

exports.learnpath = function(req, res) {
  console.log(req.params);
  var pathId = req.params.lid;
  if (!pathId) {
    res.send("path Id not defined");
  } else {
    // fetch tutorial based on id
    var path = {
      id: pathId,
      title: 'NodeJS path',
      createdBy: 'Hung Doan',
      star: 5,
      desc: "In this path I will run you through the process setting up an Express.js app and making it do what a basic website might do. You will learn the basics of routes, views, Jade templates, Stylus CSS engine, handling POST and GET requests.",
      url: 'http://www.hacksparrow.com/express-js-tutorial.html',
      stat: {
        likes: 103,
        shares: 50,
        views: 1042
      },
      comments: [
          {poster: {name: 'Hung Doan',
                    profile_url: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/371019_697811725_247259128_q.jpg'},
          content: 'Hello world!'}
      ]
    };
    res.render('learnpath', {
      title: path.title,
      path: path
    });
  }
}

/*
 * GET login page.
 */
exports.login = function(req, res){
  console.log('login');
  res.render('login', { title: 'Login' });
};



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


exports.newLearnpath = function(req, res){
  console.log("new path ");
  res.render('new_path', {});
};

exports.postNewLearnpath = function(req, res){
  console.log(req.body);
  var title = req.body.title;
};



/*
 * POST tut comment
 */

exports.postTutorialComment = function(req, res){

  var comment = req.body.comment;
  var tutorialId  = req.params.tid;
  console.log("comment " + comment + " tutorial id " +tutorialId);
  res.send("respond with a resource");
};

exports.postLearnpathComment = function(req, res){

  var comment = req.body.comment;
  var learnpathId  = req.params.lid;
  console.log("comment " + comment + " learnpath id " +learnpathId);
  res.send("respond with a resource");
};

exports.profile = function(req, res){
  var uid = req.params.uid;
  var user = {
    id : uid,
    name : "Hung Doan",
    about: "I am a programmer",
    stat: {
      friends: 19,
      paths : 3,
      tutorials : 45
    },
    skills : ["javascript","javascript-basic","nodejs","nodejs-intermediate","expressjs-basic","openVC-basic","objectiveC-basic"],
    completedPaths : [
      { name :"basic javascript" , url : "http://google.com"},
      { name :"basic javascript" , url : "http://google.com"},
      { name :"basic javascript" , url : "http://google.com"}
    ],
    completedTutorials: [
      { name :"basic javascript" , url : "http://google.com"},
      { name :"basic javascript" , url : "http://google.com"},
      { name :"basic javascript" , url : "http://google.com"},
      { name :"basic javascript" , url : "http://google.com"},
      { name :"basic javascript" , url : "http://google.com"}
    ]

  }
  res.render('profile', {user: user});
};


exports.topic_hint = function(req, res) {
  var query = req.query.q;
  // fetch the list of topics starting with this query
  res.send([
      {"id":"856","name":"Javascript"},
      {"id":"1035","name":"Python"},
      {"id":"1048","name":"C++"},
      {"id":"1113","name":"NodeJs"}
  ]);
}
