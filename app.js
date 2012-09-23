/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , learnpath = require('./routes/learnpath.js')
  , tutorial = require('./routes/tutorial')
  , user = require('./routes/user')
  , search = require('./routes/search')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

console.log
var app = express();

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
app.get('/login', routes.login);
app.post('/login', routes.postLogin);
app.get('/users/:uid/profile', routes.profile);
app.get('/profile/:uid', user.profile);

app.get('/tutorial/new', tutorial.newTutorial);
app.get('/tutorial/:tid', tutorial.tutorial);
app.post('/tutorial/new', tutorial.postNewTutorial);
app.post('/tutorial/:tid/comment',tutorial.postTutorialComment);
app.post('/tutorial/:tid/like',tutorial.postTutorialLike);
app.post('/tutorial/:tid/share',tutorial.postTutorialShare);

app.get('/learnpath/new', learnpath.newLearnpath);
app.get('/learnpath/:lid', learnpath.learnpath);
app.post('/learnpath/new', learnpath.postNewLearnpath);
app.post('/learnpath/:lid/comment',learnpath.postLearnpathComment);
app.post('/learnpath/:lid/like',learnpath.postLearnpathLike);
app.post('/learnpath/:lid/share',learnpath.postLearnpathShare);

app.get('/search', search.list);
app.get('/topic_hint', routes.topic_hint);
app.get('/auth',
  passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/');
  }
);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

