import prisma from '../config/prisma.js';

async function createTag(name) {
  await prisma.tag.create({
    data: {
      name,
    },
  });
}

export default { createTag };
