
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
  res.render('login',{ title: 'Login' });
};

/*
 * GET path page.
 */
exports.login = function(req, res){
  console.log('path');
  res.render('path',{ title: 'Path title' });
};

