var modelProvider = require('../models/model').instance;

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

exports.newLearnpath = function(req, res){
  console.log("new path ");
  res.render('new_path', {});
};

exports.postNewLearnpath = function(req, res){
  console.log(req.body);
  var title = req.body.title;
};

exports.postLearnpathComment = function(req, res){

  var comment = req.body.comment;
  var learnpathId  = req.params.lid;
  console.log("comment " + comment + " learnpath id " +learnpathId);
  res.send("respond with a resource");
};

exports.postLearnpathLike = function(req, res){

  var comment = req.body.comment;
  var learnpathId  = req.params.lid;
  console.log("comment " + comment + " learnpath id " +learnpathId);
  res.send("respond with a resource");
};

exports.postLearnpathShare = function(req, res){

  var comment = req.body.comment;
  var learnpathId  = req.params.lid;
  console.log("comment " + comment + " learnpath id " +learnpathId);
  res.send("respond with a resource");
};