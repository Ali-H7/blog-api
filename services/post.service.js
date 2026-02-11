import prisma from '../config/prisma';

async function createPost(postObject) {
  const { title, content, dateCreated, published, userId } = postObject;
  await prisma.post.create({
    data: {
      title,
      content,
      dateCreated,
      published,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export default { createPost };
