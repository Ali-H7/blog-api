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

async function findPostsByTag(slug) {
  const posts = prisma.tag.findUnique({
    where: {
      slug,
    },
    include: { posts: true },
  });
  return posts;
}

export default { createTag, findAllTags, findPostsByTag };
