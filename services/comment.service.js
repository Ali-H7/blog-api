import prisma from '../config/prisma.js';

async function createComment(commentObject) {
  const { nickname, content, userId, postId } = commentObject;
  await prisma.comment.create({
    data: {
      nickname,
      content,
      user: userId ? { connect: { id: userId } } : undefined,
      post: { connect: { id: postId } },
    },
  });
}

export default { createComment };
