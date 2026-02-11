import prisma from '../config/prisma.js';

async function createUser(userObject) {
  const { userName, password } = userObject;
  const user = await prisma.user.create({
    data: {
      userName,
      password,
    },
    select: {
      id: true,
      userName: true,
    },
  });
  return user;
}

async function findByUserName(userName) {
  const user = await prisma.user.findFirst({
    where: {
      userName: { equals: userName, mode: 'insensitive' },
    },
  });
  return user;
}

export default { createUser, findByUserName };
