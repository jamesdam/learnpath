
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
  console.log(req.params);
  var tutorialId = req.params.tid;
  if (!tutorialId) {
    res.send("response with a resource");
  } else {
    // fetch tutorial based on id
    var tut = {
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
      ]
    };
    res.render('tutorial', {
      title: tut.title,
      tut: tut
    });
  }
}

exports.learnpath = function(req, res) {
  console.log(req.params);
  res.render('learnpath',{ title: 'Path title' });
}

/*
 * GET login page.
 */
exports.login = function(req, res){
  console.log('login');
  res.render('login', { title: 'Login' });
};


