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
        some: { published: true },
      },
    },
    include: {
      _count: {
        select: { posts: { where: { published: true } } },
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

async function findTagWithPublishedPosts(slug) {
  const tag = await prisma.tag.findUnique({
    where: {
      slug,
    },
    include: {
      posts: {
        where: {
          published: true,
        },
        include: { tags: true },
      },
    },
  });

  return tag;
}

async function findAllTags() {
  const tag = await prisma.tag.findMany();
  return tag;
}

export default { createTag, updateTag, deleteTag, findTagsWithPostCount, findTagWithPublishedPosts, findAllTags };
