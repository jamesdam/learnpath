
/*
 * GET users listing.
 */

exports.profile = function(req, res){
var uid = req.params.uid;

  var user = {
    id : uid,
    name : uid,
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
