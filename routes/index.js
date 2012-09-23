var modelProvider = require('../models/model').instance;
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


/*
 * GET login page.
 */
exports.login = function(req, res){
  console.log('login');
  res.render('login', { title: 'Login' });
};

exports.postLogin = function(req, res){
  console.log(req.body);
  res.redirect('/auth?username='+req.body.username+'&password='+req.body.password);
  //res.render('login', { title: 'Login' });
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
