import prisma from '../config/prisma.js';

async function createUser(userObject) {
  const { userName, password } = userObject;
  console.log(userName);
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

async function findByUserId(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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

async function findIsAdmin(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      roleId: 2,
    },
  });
  return user;
}

async function updateRole(userId, roleId) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { roleId },
  });
  return user;
}

export default { createUser, findByUserId, findByUserName, findIsAdmin, updateRole };
