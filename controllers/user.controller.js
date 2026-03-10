import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { userService } from '../services/index.js';
import jwt from 'jsonwebtoken';

async function signup(req, res) {
  const data = req.validatedData;
  const encryptedPassword = await bcrypt.hash(data.password, 10);
  const userObject = { ...data, password: encryptedPassword };
  const user = await userService.createUser(userObject);
  res.status(201).json({ user });
}

function login(req, res) {
  const payload = { id: req.user.id, userName: req.user.userName };
  console.log(payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
  return res.status(200).json({ user: payload, token });
}

export default { signup, login };
