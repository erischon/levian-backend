import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";

import { UserModel } from "../user";

// Serialize the user.id to save in the cookie session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize the cookieUserId to user in the database
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
  }
});

// Create a Passport middleware to authenticate with a Google Strategy
const passportGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "/auth/google/callback",
      },
      async (
        accessToken: string,
        refreshToken: any,
        profile: Profile,
        done: VerifyCallback
      ) => {
        const existingUser = await UserModel.findOne({ googleId: profile.id });

        console.log("passport", passport);

        existingUser
          ? done(null, existingUser)
          : new UserModel({ googleId: profile.id })
              .save()
              .then((user) => done(null, user));
      }
    )
  );
};

export default passportGoogle;
