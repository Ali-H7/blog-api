import { jwtAuthentication } from '../config/passport.js';

const optionalAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return jwtAuthentication(req, res, next);
  }

  next();
};

export default optionalAuthentication;
