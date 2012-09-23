
var modelProvider = require('../models/model').instance;

var MockData = require('../MockData.js');
/*
 * GET home page.
 */

exports.index = function(req, res) {
  if (!req.user) {
    var data = {
      title: 'LearningPath!',
      paths: MockData.paths,
      new_tuts: MockData.tuts,
    };
    res.render('index', data);
  } else {
    res.render('profile', { title: req.user });
  }
};

/*
 * GET login page.
 */
exports.login = function(req, res){
  console.log('login');
  res.render('login', { title: 'Login' });
};

exports.postLogin = function(req, res){
  console.log(req.body);
  modelProvider.findUserByName(req.body.name, function (err,result){
      if(err == null && result == null)
      {
        var user ={
          name:req.body.username,
          email:"admin@test.com"
        }
        modelProvider.createUser(user,function(err,result){
          res.redirect('/auth?username='+req.body.username+'&password='+req.body.password);
        });
      }
  })

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
  modelProvider.findListKeyWordWithQuery(query, function(err, result) {
    if (err) {
      res.send([]);
    } else {
      console.log(result);
    // fetch the list of topics starting with this query
    result = result.splice(0, 10);
    listResult = [];
    for (var i = 0; i<result.length; i++) {
        listResult.push({
          "id": result[i]._id.toHexString(),
          "name": result[i].keyWord
        });
    }
    res.send(listResult);
    }
  });
}
