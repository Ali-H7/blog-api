import { userService } from '../services/index.js';
import { errors } from '../helpers/index.js';

async function checkIfAdmin(req, res, next) {
  const { user } = req;
  const userId = user.id;
  const isAdmin = await userService.findIsAdmin(userId);
  if (isAdmin) return next();
  throw new errors.GenericError('Access denied', 403);
}

export default checkIfAdmin;
