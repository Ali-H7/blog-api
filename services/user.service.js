import prisma from '../config/prisma';

async function createUser(userObject) {
  const { userName, password } = userObject;
  await prisma.user.create({
    data: {
      userName,
      password,
    },
  });
}

export default { createUser };
