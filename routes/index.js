
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Learn Path' });
};

/*
 * GET login page.
 */
exports.login = function(req, res){
  console.log('login');	
  res.render('login',{ title: 'Login' });
};