const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const dataset = require('./models/model');

function initialize(passport) {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, async (username, password, done) => {
    const user = await dataset.findOne({ email: username });
    if (!user) return done(null, false, { message: "No such User found in the database!" });
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user); // serialize the user object
      } else {
        return done(null, false, { message: "Failed to login" });
      }
    } catch (e) {
      return done(e, false);
    }
  }));

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser((id, done) => {
    const user = dataset.findById(id);
    done(null, user);
  });
}
module.exports = {
  initialize
};