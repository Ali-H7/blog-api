import prisma from '../config/prisma';

async function createPost(postObject) {
  const { title, content, dateCreated, published, slug, userId } = postObject;
  await prisma.post.create({
    data: {
      title,
      content,
      dateCreated,
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
  });
  return post;
}

async function findPublishedPosts() {
  const publishedPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });
  return publishedPosts;
}

async function findAllPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

export default { createPost, findPost, findPublishedPosts, findAllPosts };
