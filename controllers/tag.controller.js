import { tagService } from '../services/index.js';
import { createError } from '../helpers/index.js';
import convertToSlug from '../config/slugify.js';

async function getPostsByTag(req, res) {
  const { slug } = req.params;
  const posts = await tagService.findPostsByTag(slug);
  if (!posts) {
    throw createError('Posts not found', 404);
  }
  res.status(200).json({ posts });
}

async function createTag(req, res) {
  const { name } = req.body;
  const slug = convertToSlug(name);
  const tag = await tagService.createTag(name, slug);
  res.status(201).json({ tag });
}

async function updateTag(req, res) {
  const id = +req.body.id;
  const { name } = req.body;
  const slug = convertToSlug(name);
  const tag = await tagService.updateTag(id, name, slug);
  res.status(200).json({ tag });
}

async function deleteTag(req, res) {
  const id = +req.body.tagId;
  await tagService.deleteTag(id);
  res.status(204).json();
}

export default { getPostsByTag, createTag, updateTag, deleteTag };
