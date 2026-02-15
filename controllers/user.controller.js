import bcrypt from 'bcryptjs';
import { validationResult, matchedData } from 'express-validator';
import { userService } from '../services/index.js';

async function signup(req, res) {
  const errorsObject = validationResult(req);
  if (!errorsObject.isEmpty()) {
    const errors = errorsObject.array({ onlyFirstError: true });
    res.status(400).json({ errors });
  }
  const data = matchedData(req);
  const encryptedPassword = await bcrypt.hash(data.password, 10);
  const userObject = { ...data, password: encryptedPassword };
  const user = await userService.createUser(userObject);
  res.status(201).json({ user });
}

export default { signup };
