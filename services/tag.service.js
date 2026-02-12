import prisma from '../config/prisma.js';

async function createTag(name) {
  await prisma.tag.create({
    data: {
      name,
    },
  });
}

async function findAllTags() {
  const tags = await prisma.tag.findMany();
  return tags;
}

export default { createTag, findAllTags };
