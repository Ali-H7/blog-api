import prisma from '../config/prisma';

async function createUser(userObject) {
  await prisma.user.create({
    data: {
      userName: userObject.email,
      password: userObject.firstName,
    },
  });
}

export default { createUser };
