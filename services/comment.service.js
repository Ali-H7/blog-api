import prisma from '../config/prisma.js';

async function createComment(commentObject) {
  const { content, userId, postId } = commentObject;
  const data = {
    content,
    post: { connect: { id: postId } },
  };
  if (userId) data.user = { connect: { id: userId } };
  const comment = await prisma.comment.create({
    data,
    include: {
      user: { select: { id: true, userName: true } },
    },
  });
  return comment;
}

async function deleteComment(id) {
  await prisma.comment.delete({
    where: {
      id,
    },
  });
}

export default { createComment, deleteComment };
