import { commentService } from '../services/index.js';

async function createComment(req, res) {
  const { user } = req;
  const { content, postId } = req.validatedData;
  let commentObject = { content, postId };
  if (user) commentObject = { ...commentObject, userId: user.id };
  const comment = await commentService.createComment(commentObject);
  res.status(201).json({ comment });
}

export default { createComment };
