import prisma from '../config/prisma.js';

async function createPost(postObject) {
  const { title, rawText, formattedText, published, slug, tags, userId } = postObject;
  const post = await prisma.post.create({
    data: {
      title,
      rawText,
      formattedText,
      published,
      slug,
      user: {
        connect: {
          id: userId,
        },
      },
      tags: {
        connect: tags,
      },
    },
  });
  return post;
}

async function updatePost(postObject) {
  const { id, title, rawText, formattedText, published, slug, tags } = postObject;
  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      rawText,
      formattedText,
      published,
      slug,
      tags: {
        set: tags,
      },
    },
  });
  return post;
}

async function findPost(slug) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      comments: {
        include: {
          user: {
            select: {
              userName: true,
            },
          },
        },
        orderBy: { dateCreated: 'desc' },
      },
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
    orderBy: { dateCreated: 'desc' },
  });
  return publishedPosts;
}

async function findAllPosts() {
  const posts = await prisma.post.findMany({ include: { tags: true }, orderBy: { dateCreated: 'desc' } });
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

async function deletePost(id) {
  await prisma.post.delete({
    where: {
      id,
    },
  });
}

export default { createPost, updatePost, findPost, findPublishedPosts, findAllPosts, findPostsByQuery, deletePost };
