import prisma from '../config/prisma.js';

async function createComment(commentObject) {
  const { content, userId, postId } = commentObject;
  const data = {
    content,
    post: { connect: { id: postId } },
  };
  if (userId) data.user = { connect: { id: userId } };
  const comment = await prisma.comment.create({ data });
  return comment;
}

export default { createComment };
