import { tagService } from '../services/index.js';
import { createError } from '../helpers/index.js';

async function getPostsByTag(req, res) {
  const { slug } = req.params;
  const posts = await tagService.findPostsByTag(slug);
  if (!posts) {
    throw createError('Posts not found', 404);
  }
  res.status(200).json({ posts });
}

export default { getPostsByTag };
