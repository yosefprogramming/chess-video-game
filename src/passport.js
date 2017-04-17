const passport = require('passport');
const { Strategy } = require('passport-local');
const db = require('./db');

passport.use(new Strategy(
  function(username, password, cb) {

    db.query('SELECT * FROM users WHERE username = $1;', [ username ], )
      .then(([ user ]) => {
        if (!user) { cb(null, false); }
        if (user.password != password) { return cb(null, false); }
      })
      .catch(err => {
        console.error('failed to select user for authentication', err);
        cb(err);
      });

}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
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

    app.post('/session',
      passport.authenticate('local', { failureRedirect: '/login' }),
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
