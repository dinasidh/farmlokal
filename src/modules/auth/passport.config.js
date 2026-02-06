import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "./user.model.js";

export function configurePassport({ env }) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.google.clientId,
        clientSecret: env.google.clientSecret,
        callbackURL: `${env.publicBaseUrl.replace(/\/$/, "")}/v1/auth/google/callback`,
        scope: ["profile", "email"]
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const { id: googleId, displayName: name, emails, photos } = profile;
          const email = emails?.[0]?.value ?? "";
          const picture = photos?.[0]?.value ?? "";

          let user = await User.findOne({ googleId });
          if (!user) {
            user = await User.create({ googleId, email, name, picture });
            console.log(`New user created via Google: ${email} (${user._id})`);
          } else {
            await User.updateOne(
              { _id: user._id },
              { $set: { name, picture, email } }
            );
            user = await User.findById(user._id);
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id.toString());
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  return passport;
}
