const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config();

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://cse341-gabm.onrender.com/google/callback",
    // callbackURL: "http://localhost:3003/google/callback",
    passReqToCallback: true
},
function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));
