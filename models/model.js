
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
			user_name: String,
			user_email: String,
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
			listLearnedPath: [
			{
				pathId: ObjectId
			}
			]});

	console.log("Trying to create User table");
	var User = mongoose.model('User', userSchema);


	var topicSchema = new Schema( {
		name: String,
		description: String,
		listRelatedTutorial: [
		{
			tutorialId: ObjectId,
			level: Number
		}
		],
	});

	console.log("Trying to create Topic table");

	var Topic = mongoose.model('Topic', topicSchema);

	var tutorialSchema = new Schema( {
		name: String,
		description: String,
		content: [
		{
			step: Number,
			link: String		
		}
		],
		type: String,
		level: Number,
		enableTopic: ObjectId,
		requiredTopic: [
		{
			topicId: ObjectId,
			isRequired: Boolean
		}
		]
	});

	console.log("Trying to create Tutorial table");

	var Tutorial = mongoose.model('Tutorial', tutorialSchema);


	var pathSchema = new Schema( {
		name: String,
		description: String,
		content: [
		{
			step: Number,
			type: String,
			itemId: ObjectId,
		}
		]
	});


	console.log("Trying to create Path table");

	var Path = mongoose.model('Path', pathSchema);

	fn();
}

ModelProvider.prototype.getCollection= function(callback) {
				this.db.collection('articles', function(error, article_collection) {
												if( error ) callback(error);
												else callback(null, article_collection);
												});
};

ModelProvider.prototype.findAllTopic = function(callback) {
	this.Topic.find(function(err, topics){
		if (err)
			callback(err);
		else {
			callback(null, topics);
		} 
	})
}


ModelProvider.prototype.findPopularTutorial = function(number, callback) {

}

ModelProvider.prototype.findAll = function(callback) {
				this.getCollection(function(error, article_collection) {
												if( error ) callback(error)
												else {
												article_collection.find().toArray(function(error, results) {
																if( error ) callback(error)
																else callback(null, results)
																});
												}   
												});  
};        

ModelProvider.prototype.findTopicById = function(id, callback) {
				this.getCollection(function(error, article_collection) {
												if( error ) callback(error)
												else {
												article_collection.findOne({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
																if( error ) callback(error) 
																else callback(null, result)
																}); 
												}
												});
};  

ModelProvider.prototype.createLearningPath = function(newPath, callback) {
				var learningPath = new Path();
				learningPath.name = newPath.name || "";
				learningPath.description = newPath.description || "";
				learningPath.content = [];
				var content = newPath.content;
				for (var i = 0; i < content.length; i++) {
								learningPath.content.push(content[i]);
				}
				learningPath.save(function(err) {
												if (err) 
												console.log(err);
												});
}

ModelProvider.prototype.createTopic = function(newTopic, callback) {

	this.getCollection(function(error, article_collection) {
									if( error ) callback(error)
									else {
									if( typeof(articles.length)=="undefined")
									articles = [articles];

									for( var i =0;i< articles.length;i++ ) {
									article = articles[i];
									article.created_at = new Date();
									if( article.comments === undefined ) article.comments = [];
									for(var j =0;j< article.comments.length; j++) {
									article.comments[j].created_at = new Date();
									}
									}

									article_collection.insert(articles, function() {
													callback(null, articles);
													});
									}
									});
}



ModelProvider.prototype.createUser = function(articles, callback) {
				this.getCollection(function(error, article_collection) {
												if( error ) callback(error)
												else {
												if( typeof(articles.length)=="undefined")
												articles = [articles];

												for( var i =0;i< articles.length;i++ ) {
												article = articles[i];
												article.created_at = new Date();
												if( article.comments === undefined ) article.comments = [];
												for(var j =0;j< article.comments.length; j++) {
												article.comments[j].created_at = new Date();
												}
												}

												article_collection.insert(articles, function() {
																callback(null, articles);
																});
												}
												});
};



ModelProvider.prototype.addCommentToModel = function(articleId, comment, callback) {
				this.getCollection(function(error, article_collection) {
												if( error ) callback( error );
												else {
												article_collection.update(
																{_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(articleId)},
																{"$push": {comments: comment}},
																function(error, article){
																if( error ) callback(error);
																else callback(null, article)
																});
												}
												});
};


