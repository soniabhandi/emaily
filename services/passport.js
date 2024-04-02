const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GithubStrategy = require("passport-github").Strategy;
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });

      // console.log(profile);
    }
  )
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: keys.githubClientID,
//       clientSecret: keys.githubClientSecret,
//       callbackURL: "/auth/github/callback",
//     },
//     (refreshToken, accessToken, profile, done) => {
//       User.findOne({ githubId: profile.id }).then((existingUser) => {
//         if (existingUser) {
//           done(null, existingUser);
//         } else {
//           new User({ githubId: profile.id })
//             .save()
//             .then((user) => done(null, user));
//         }
//       });
//       // console.log(profile);
//     }
//   )
// );
