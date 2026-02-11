import prisma from '../config/prisma';

async function createTag(name) {
  await prisma.tag.create({
    data: {
      name,
    },
  });
}

export default { createTag };
