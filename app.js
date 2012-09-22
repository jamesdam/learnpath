
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
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
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
app.post('/tutorial/new', routes.postNewTutorial);

app.get('/learnpath/new', routes.newLearnpath);
app.post('/learnpath/new', routes.postNewLearnpath);


app.get('/login', routes.login);
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
