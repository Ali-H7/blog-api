import prisma from '../config/prisma.js';

async function createTag(name, slug) {
  const tag = await prisma.tag.create({
    data: {
      name,
      slug,
    },
  });
  return tag;
}

async function updateTag(id, name, slug) {
  const tag = await prisma.tag.update({
    where: { id },
    data: {
      name,
      slug,
    },
  });
  return tag;
}

async function deleteTag(id) {
  await prisma.tag.delete({
    where: {
      id,
    },
  });
}

async function findTagsWithPostCount() {
  const tags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {},
      },
    },
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
  });
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

export default { createTag, updateTag, deleteTag, findTagsWithPostCount, findPostsByTag };
