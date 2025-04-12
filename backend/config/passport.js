import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import dotenv from "dotenv";
dotenv.config();

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Google Profile:", profile);

      const email = profile.emails?.[0]?.value;
      if (!email) {
        console.error("No email found in Google profile");
        return done(new Error("No email found"), null);
      }

      const user = {
        _id: profile.id,
        name: profile.displayName,
        email,
        provider: "google",
      };
      return done(null, user);
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'emails', 'photos'],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Facebook Profile:", profile);

      const email = profile.emails?.[0]?.value;
      if (!email) {
        console.error("No email found in Facebook profile");
        return done(new Error("No email found"), null);
      }

      const user = {
        _id: profile.id,
        name: profile.displayName,
        email,
        provider: "facebook",
      };
      return done(null, user);
    }
  )
);

// Session serialize & deserialize
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
