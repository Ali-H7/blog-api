import bcrypt from 'bcryptjs';
import { userService } from '../services/index.js';

async function signup(req, res) {
  const data = req.validatedData;
  const encryptedPassword = await bcrypt.hash(data.password, 10);
  const userObject = { ...data, password: encryptedPassword };
  const user = await userService.createUser(userObject);
  res.status(201).json({ user });
}

export default { signup };
