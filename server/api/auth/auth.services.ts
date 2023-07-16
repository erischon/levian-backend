import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";

// Create a Passport middleware to authenticate with a Google Strategy
const passportGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "/auth/google/callback",
      },
      (
        accessToken: string,
        refreshToken: any,
        profile: Profile,
        done: VerifyCallback
      ) => {
        console.log("Access Token: ", accessToken);
        console.log("Refresh Token: ", refreshToken);
        console.log("Profile: ", profile);
      }
    )
  );
};

export default passportGoogle;
