var modelProvider = require('../models/model').instance;

var MockData = require('../MockData.js');

exports.learnpath = function(req, res) {
  console.log(req.params);
  var pathId = req.params.lid;
  if (!pathId) {
    res.send("path Id not defined");
  } else {
    // fetch tutorial based on id
    console.log(path);
    var path = MockData.getPath(pathId);
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

  var path = {
    name : req.body.goal,
    description : req.body.description,
    content : []
  };
  count = 1;
  while(req.body[count]!= null){
    path.content.push(req.body[count]);
    console.log(count);
    count++;
  }

  modelProvider.createPath(path, function (err,learnpathId) {
    var title;
    if (err)
      res.send(err);
    else
      res.redirect('/learnpath/'+learnpathId);

  });
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
