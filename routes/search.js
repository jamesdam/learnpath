
/*
 * GET search results.
 */

exports.list = function(req, res){
  // res.send("respond with a resource");
  res.render('search', { title: 'Search Result' });
};