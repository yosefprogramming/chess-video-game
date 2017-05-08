const passport = require('passport');
const { Strategy } = require('passport-local');
const db = require('./db');

const localStrategy = new Strategy((username, password, cb) => {
  console.log("--")
  db.query('SELECT * FROM users WHERE username = $1;', [ username ])
    .then(([ user ]) => {
      console.log('received response from postgres query', user);
      if (!user) { cb(null, false); }
      if (user.password != password) { return cb(null, false); }
    })
    .catch(err => {
      console.error('failed to select user for authentication', err);
      cb(err);
    });
  console.log("do we get this far?");
});

passport.use(localStrategy);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  console.log('deserializeUser')
  db.query('SELECT * FROM users WHERE id = $1', [ id ])
    .then(([ user ]) => {
        cb(null, user);
    })
    .catch(err => {
        cb(err);
    });
});

const registerPassport = app => {

  app.use(passport.initialize());
  app.use(passport.session());

  const authenticate = passport.authenticate('local', { failureRedirect: '/login' })

  app.post('/session',
    (req, res, next) => { debugger; next(); },
    authenticate,
    function(req, res) {
      res.redirect('/');
    });

  app.delete('/session',
    function(req, res){
      req.logout();
      res.redirect('/');
    });

};

module.exports = registerPassport;
