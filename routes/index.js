var modelProvider = require('../models/model').instance;
/*
 * GET home page.
 */

exports.index = function(req, res) {
  if (!req.user) {
    var tut = {
      id: 10,
      icon: 'http://si0.twimg.com/profile_images/1437021459/nodejs-dark.png',
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
      acquires: [
        'nodejs-basic',
        'javascript',
      ],
    };
    var data = {
      title: 'LearningPath!',
      popular_tuts: [tut, tut, tut],
      new_tuts: [tut, tut]
    };
    res.render('index', data);
  } else {
    res.render('index', { title: req.user });
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
