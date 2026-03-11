import prisma from '../config/prisma.js';

async function createPost(postObject) {
  const { title, content, published, slug, userId } = postObject;
  await prisma.post.create({
    data: {
      title,
      content,
      published,
      slug,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

async function findPost(slug) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      comments: true,
      tags: true,
      user: {
        select: {
          userName: true,
        },
      },
    },
  });
  return post;
}

async function findPublishedPosts() {
  const publishedPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: { tags: true },
  });
  return publishedPosts;
}

async function findAllPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

async function findPostsByQuery(query) {
  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: query,
        mode: 'insensitive',
      },
      published: true,
    },
  });
  return posts;
}

export default { createPost, findPost, findPublishedPosts, findAllPosts, findPostsByQuery };
