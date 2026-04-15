import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { userService } from '../services/index.js';
import jwt from 'jsonwebtoken';
import { errors } from '../helpers/index.js';

async function signup(req, res) {
  const data = req.validatedData;
  const encryptedPassword = await bcrypt.hash(data.password, 10);
  const userObject = { ...data, password: encryptedPassword };
  const user = await userService.createUser(userObject);
  res.status(201).json({ user });
}

function login(req, res) {
  const isAdmin = req.user.roleId === 2;
  const payload = { id: req.user.id, userName: req.user.userName, ...(isAdmin && { isAdmin }) };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
  return res.status(200).json({ user: payload, token });
}

async function updateRole(req, res) {
  const { user } = req;
  const userId = user.id;
  if (user.roleId === 2) throw new errors.GenericError("You're already an Admin!", 409);
  const updatedUser = await userService.updateRole(userId, 2);
  const isAdmin = updatedUser.roleId === 2;
  const payload = { id: updatedUser.id, userName: updatedUser.userName, ...(isAdmin && { isAdmin }) };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
  return res.status(200).json({ user: payload, token });
}

export default { signup, login, updateRole };
