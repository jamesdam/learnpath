ModelProvider = function(mongoose, host, port){
  console.log("Trying to connect to db");
  this.db = mongoose.connect('mongodb://localhost/learnpath');
  var self = this;
  console.log(typeof self);
  createSchema(mongoose, function () {
    self.User = mongoose.model('User');
    console.log("it runs here!!!!!");
    console.log(typeof self);
    console.log(typeof self.User);
    self.Topic = mongoose.model('Topic');
    self.Tutorial = mongoose.model('Tutorial');
    self.Path = mongoose.model('Path');
  });
};

exports.ModelProvider = ModelProvider;

function createSchema(mongoose, fn) {
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;
  var userSchema = new Schema({
    name: String,
      email: String,
      listLearnedPath:
    [
  {
    pathId: ObjectId,
      numFinished: Array,
      numSkipped: Array
  }
  ],
      listLearnedTopic: [
  {
    topicId: ObjectId
  }
  ],
      listLearnedTutorial: [
  {
    tutorialId: ObjectId
  }
  ],
    listLikedTutorial: [
    {
      tutorialId: ObjectId

    }],
    listSharedTutorial: [
    {
      tutorialId: ObjectId
    }
  ],
    listLikedPath: [
    {
      pathId: ObjectId

    }],
    listSharedPath: [
    {
      pathId: ObjectId
    }
  ],
    listLearnedPath: [
    {
      pathId: ObjectId
    }
  ]});


  userSchema.virtual('id')
    .get(function() {
      return this._id.toHexString();
    });

  var User = mongoose.model('User', userSchema);

  var topicSchema = new Schema( {
    name: String,
      description: String,
      listRelatedTutorial: [
  {
    tutorialId: ObjectId,
  }
  ],
  });

  topicSchema.virtual('id')
    .get(function() {
      return this._id.toHexString();
    });

  var Topic = mongoose.model('Topic', topicSchema);

  var tutorialSchema = new Schema( {
    name: String,
      description: String,
      author: String,
      content: String,
      type: String,
      imageUrl: String,
      level: Number,
      enableTopics: [
  {
    topicId: ObjectId
  }
  ],
      requiredTopics: [
  {
    topicId: ObjectId
  }],
      likeUsers: [
  {
    userId: ObjectId
  }
  ],
    shareUsers: [
    {
      userId: ObjectId
    }
  ]

  });

  tutorialSchema.virtual('id')
    .get(function() {
      return this._id.toHexString();
    });

  var Tutorial = mongoose.model('Tutorial', tutorialSchema);

  var pathSchema = new Schema( {
    name: String,
      description: String,
      baseRequirement: [
  {
    userId: ObjectId
  }],
      content: [
  {
    step: Number,
      type: String,
      itemId: ObjectId,
  }],
      likeUsers: [
  {
    userId: ObjectId
  }
  ],
      shareUsers: [
  {
    userId: ObjectId
  }
  ]
  });

  pathSchema.virtual('id')
    .get(function() {
      return this._id.toHexString();
    });

  var Path = mongoose.model('Path', pathSchema);

  fn();
}


ModelProvider.prototype.findAllTopic = function(callback) {
  this.Topic.find(function(err, topics){
    if (err)
    callback(err);
    else {
      callback(null, topics);
    }
  });
}

ModelProvider.prototype.findTopicById = function(id, callback) {
  this.Topic.findById(id, function(err, tuts) {
    if (err)
    callback(err);
    else {
      callback(null, tuts);
    }
  });
}


ModelProvider.prototype.findTutorialById = function(id, callback) {
  this.Tutorial.findById(id, function(err, tuts) {
    if (err)
    callback(err);
    else {
      callback(null, tuts);
    }
  });
}

ModelProvider.prototype.findUserById = function(id, callback) {
  this.User.findById(id, function(err, tuts) {
    if (err)
    callback(err);
    else {
      callback(null, tuts);
    }
  });
}

ModelProvider.prototype.findPathById = function(id, callback) {
  this.Path.findById(id, function(err, tuts) {
    if (err)
    callback(err);
    else {
      callback(null, tuts);
    }
  });
}

ModelProvider.prototype.findTutorialByTopicId = function(topicId, number, callback) {
  var topic = findTopicById(topicId, function(err, tut) {
    var number = number || 10;
    if (err)
    callback(err);
    else {
      tutIds = topic.listRelatedTutorial;
      var listTuts = [];
      for (var id in tutIds) {
        findTutorialById(id, function(err, tut) {
          if (!err) {
            listTuts.push(tut);
          }
        });
      }
      callback(null, listTuts);
    }
  });
}

ModelProvider.prototype.createTopic = function(top, callback) {
  var topic = this.Topic();
  topic.name = top.name;
  topic.description = top.description;
  topic.listRelatedTutorial = [];
  topic.save(function(err, topic) {
    if (err)
    callback(err);
    else {
      callback(null, topic.toObject()._id.toHexString());
    }
  });
}

ModelProvider.prototype.createTutorial = function(tut, callback) {
  var tutorial = this.Tutorial();
  tutorial.name = tut.name;
  tutorial.description = tut.description;
  tutorial.author = tut.author || '';
  tutorial.content = tut.content;
  tutorial.type = tut.type;
  tutorial.imageUrl = tut.imageUrl;
  tutorial.level = tut.level;
  tutorial.enableTopics = [];

  tutorial.requiredTopics = [];
  console.log(tutorial);
  tutorial.save(function(err, prod) {
    console.log(err);
    if (err)
    callback(err);
    else {
      callback(null, tutorial._id.toHexString());
    }
  });
}

ModelProvider.prototype.createUser = function(us, callback) {
  var user = this.User();
  user.name = us.name;
  user.email = us.email;
  user.listLearnedPath = [];
  user.LearnedTopic = [];
  user.listLearnedTutorial = [];
  user.listLikedTutorial = [];
  user.listSharedTutorial = [];
  user.listLikedPath = [];
  user.listSharedPath = [];
  user.listLearnedPath = [];
  user.save(function(err, user) {
    if (err)
    callback(err);
    else {
      callback(null, user.toObject()._id.toHexString());
    }
  });
}

ModelProvider.prototype.createPath = function(pa, callback) {
  var path = this.Path();
  path.name = pa.name;
  path.description = pa.description;
  path.content = [];
  path.likeUsers = [];
  path.shareUsers = [];
  path.save(function(err, path) {
    if (err)
    callback(err);
    else {
      callback(null, path.toObject()._id.toHexString());
    }
  });
}


ModelProvider.prototype.addUserLikePath = function(userId, pathId, callback) {
  var user = findUserById(userId);
  if (user.listLikedPath.indexOf(pathId) !== -1) {
    var path = findPathById(pathId);
    user.listLikedPath.push(createFromHexString(pathId));
    path.likeUsers.push(createFromHexString(userId));
    user.save();
    path.save();
    callback(null);
  } else {
    var err = "Duplicate user-path like";
    callback(err);
  }
}

ModelProvider.prototype.addUserSharePath = function(userId, pathId, callback) {
  var user = findUserById(userId);
  if (user.listSharedPath.indexOf(pathId) !== -1) {
    var path = findPathById(pathId);
    user.listSharedPath.push(createFromHexString(pathId));
    path.shareUsers.push(createFromHexString(userId));
    user.save();
    path.save();
    callback(null);
  } else {
    var err = "Duplicate user-path share";
    callback(err);
  }
}

ModelProvider.prototype.addUserLikeTutorial = function(userId, tutorialId, callback) {
  var user = findUserById(userId);
  if (user.listLikedTutorial.indexOf(tutorialId) !== -1) {
    var tut = findTutorialById(pathId);
    user.listLikedTutorial.push(createFromHexString(tutorialId));
    tut.likeUsers.push(createFromHexString(userId));
    user.save();
    tut.save();
    callback(null);
  } else {
    var err = "Duplicate user-tut like";
    callback(err);
  }
}

ModelProvider.prototype.addUserShareTutorial = function(userId, tutorialId, callback) {
  var user = findUserById(userId);
  if (user.listSharedTutorial.indexOf(tutorialId) !== -1) {
    var tut = findTutorialById(pathId);
    user.listSharedTutorial.push(createFromHexString(tutorialId));
    path.shareUsers.push(createFromHexString(userId));
    user.save();
    tut.save();
    callback(null);
  } else {
    var err = "Duplicate user-tut share";
    callback(err);
  }
}


var mongoose = require('mongoose');
var modelProvider = new ModelProvider(mongoose, '/localhost', 27017);

exports.instance = modelProvider;
