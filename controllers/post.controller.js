import { postService, tagService } from '../services/index.js';
import { errors } from '../helpers/index.js';

async function getPublishedPosts(req, res) {
  const posts = await postService.findPublishedPosts();
  res.status(200).json({ posts });
}

async function getPostsByQuery(req, res) {
  const { query } = req.query;
  const posts = await postService.findPostsByQuery(query);
  res.status(200).json({ posts });
}

async function getPostWithComments(req, res) {
  const { slug } = req.params;
  const post = await postService.findPost(slug);
  if (!post) {
    throw new errors.GenericError('Post not found', 404);
  }
  res.status(200).json({ post });
}

export default { getPublishedPosts, getPostsByQuery, getPostWithComments };
