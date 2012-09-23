var modelProvider = require('../models/model').instance;

exports.profile = function(req, res){
var uid = req.params.uid;
console.log("uid " + uid);
	modelProvider.findUserByName(uid,function(err,result){
		console.log("user " + result);
	var user = {
    id : result.uid,
    name : result.name,
    about: "I am a programmer",
    stat: {
      friends: 19,
      paths : 3,
      tutorials : 45
    },
    skills : result.listLearnedTopic,
    completedPaths : result.listLearnedPath,
    completedTutorials :result.listLearnedTutorial
   }
  res.render('profile', {user: user});
	});
  
};
