import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { userService } from '../services';

const localStrategy = new LocalStrategy(
  { usernameField: 'userName', passwordField: 'password', session: false },
  async (userName, password, done) => {
    try {
      const user = await userService.findByUserName(userName);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  },
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userService.findById(payload.id);
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const localAuthentication = passport.authenticate('local', { session: false, failWithError: true });
const jwtAuthentication = passport.authenticate('jwt', { session: false, failWithError: true });

passport.use(localStrategy);
passport.use(jwtStrategy);

export default { passport, localAuthentication, jwtAuthentication };
