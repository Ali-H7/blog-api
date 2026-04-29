import { postService } from '../services/index.js';
import { errors } from '../helpers/index.js';
import convertToSlug from '../config/slugify.js';

async function createPost(req, res) {
  const { title, rawText, formattedText, published, tags, userId } = req.body;
  const slug = convertToSlug(title);
  const postObject = { title, rawText, formattedText, published, slug, tags, userId };
  const post = await postService.createPost(postObject);
  res.status(201).json({ post });
}

async function updatePost(req, res) {
  const { id, title, rawText, formattedText, published, tags } = req.body;
  const slug = convertToSlug(title);
  const postObject = { id, title, rawText, formattedText, published, slug, tags };
  const post = await postService.updatePost(postObject);
  res.status(201).json({ post });
}

async function getPublishedPosts(req, res) {
  const posts = await postService.findPublishedPosts();
  res.status(200).json({ posts });
}

async function getAllPosts(req, res) {
  const posts = await postService.findAllPosts();
  res.status(200).json({ posts });
}

async function getPostsByQuery(req, res) {
  const { query } = req.query;
  const posts = await postService.findPostsByQuery(query);
  res.status(200).json({ posts });
}

async function getPostWithComments(req, res) {
  const { user } = req;
  const isAdmin = user?.roleId === 2;
  const { slug } = req.params;
  const post = await postService.findPost(slug);
  if (!post) throw new errors.GenericError('Post not found', 404);
  if (!post.published && !isAdmin) throw new errors.GenericError(`You don't have permission to view this post.`, 403);
  res.status(200).json({ post });
}

async function deletePost(req, res) {
  const { id } = req.validatedData;
  await postService.deletePost(id);
  res.status(204).json();
}

export default {
  getPublishedPosts,
  getAllPosts,
  createPost,
  updatePost,
  getPostsByQuery,
  getPostWithComments,
  deletePost,
};
