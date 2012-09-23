var modelProvider = require('../models/model').instance;

var MockData = require('../MockData.js');

exports.tutorial = function(req, res) {
  var tutorialId = req.params.tid;

  if (!tutorialId) {
    res.send("Error");
  } else {
    // fetch tutorial based on id

    var tut = MockData.getTut(tutorialId);
    res.render('tutorial', {
      title: tut.title,
      tut: tut
    });
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
  console.log("user name " +req.user);
  if(req.user != undefined)
  {
    modelProvider.add
  }
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

