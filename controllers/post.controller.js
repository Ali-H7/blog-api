import { postService, tagService } from '../services/index.js';
import { createError } from '../helpers/index.js';

async function getPublishedPostsAndTags(req, res) {
  const posts = await postService.findPublishedPosts();
  const tags = await tagService.findAllTags();
  res.status(200).json({ posts, tags });
}

async function getPostWithComments(req, res) {
  const { slug } = req.params;
  const post = await postService.findPost(slug);
  if (!post) {
    throw createError('Post not found', 404);
  }
  res.status(200).json({ post });
}

export default { getPublishedPostsAndTags, getPostWithComments };
