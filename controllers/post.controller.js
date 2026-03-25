import { postService } from '../services/index.js';
import { errors } from '../helpers/index.js';
import convertToSlug from '../config/slugify.js';

async function createPost(req, res) {
  const { title, content, published, userId } = req.body;
  const slug = convertToSlug(title);
  const postObject = { title, content, published, slug, userId };
  const post = await postService.createPost(postObject);
  res.status(201).json({ post });
}

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

export default { getPublishedPosts, createPost, getPostsByQuery, getPostWithComments };
