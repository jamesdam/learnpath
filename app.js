/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , search = require('./routes/search')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();
var ModelProvider = require('./models/model').ModelProvider;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: 'MySupperSecretSecret'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/topic', function(req, res){
  modelProvider.findAllTopic(function(error, topics){
   res.render('topic_show.jade', {
            title: 'Blog',
            topic: topics
    });
  });
})

app.get('/tut/new', function(req, res) {
    res.render('new_tut.jade', {
        title: 'New Post'

    });
});

app.post('/tut/new', function(req, res){
  var tut = {};
  tut.name = req.body.title;
  tut.description = req.body.description;
  tut.author = req.body.author;
  tut.content = req.body.url;
  tut.imageUrl = req.body.imageUrl;
  tut.enableTopics = req.body.acquires;
  tut.requiredTopics = req.body.requires;
  modelProvider.createTutorial(tut, function(err, tut_id) {
    var title;
    if (err) 
      title = err;
    else
      title = tut_id;
    console.log(title);
    res.render('topic_show.jade', {
      title: title,
      topic: []
    }); 
  });
});

app.get('/blog/:id', function(req, res) {
    articleProvider.findById(req.params.id, function(error, article) {
        res.render('blog_show.jade',
        {
            title: article.title,
            article:article
        });
    });
});

app.post('/blog/addComment', function(req, res) {
    articleProvider.addCommentToArticle(req.param('_id'), {
        person: req.param('person'),
        comment: req.param('comment'),
        created_at: new Date()
       } , function( error, docs) {
           res.redirect('/blog/' + req.param('_id'))
       });
});

// to use persistent login session
passport.serializeUser(function(user, done) {
  console.log('serialize ', user);
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialize ', id);
  done(null, id);
});

// TODO: change to use passport-facebook
// https://github.com/jaredhanson/passport-facebook
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Find the user from your DB (MongoDB, CouchDB, other...)
    console.log('login with ', username, password);
    done(null, username);
  }
));

app.get('/', routes.index);

app.get('/tutorial/new', routes.newTutorial);

// TESTING DATABASE, ENABLE IT LATER
app.post('/tutorial/new', routes.postNewTutorial);

app.get('/learnpath/new', routes.newLearnpath);
app.post('/learnpath/new', routes.postNewLearnpath);


app.get('/login', routes.login);
app.get('/users/:uid/profile', routes.profile);
app.get('/learnpath/:lid', routes.learnpath);
app.get('/tutorial/:tid', routes.tutorial);
app.get('/profile/:uid', user.profile);
app.get('/search', search.list);



app.post('/tutorial/:tid/comment',routes.postTutorialComment);
app.post('/learnpath/:lid/comment',routes.postLearnpathComment);

app.get('/auth',
  passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/');
  }
);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

