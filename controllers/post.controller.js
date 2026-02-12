import { postService, tagService } from '../services/index.js';

async function findPublishedPostsAndTags(req, res) {
  const posts = await postService.findPublishedPosts();
  const tags = await tagService.findAllTags();
  res.status(201).json({ posts, tags });
}

export default { findPublishedPostsAndTags };
