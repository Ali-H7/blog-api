import { tagService } from '../services/index.js';
import { errors } from '../helpers/index.js';
import convertToSlug from '../config/slugify.js';

async function getPostsByTag(req, res) {
  const { slug } = req.validatedData;
  const posts = await tagService.findPostsByTag(slug);
  if (!posts) {
    throw new errors.GenericError('Posts not found', 404);
  }
  res.status(200).json({ posts });
}

async function createTag(req, res) {
  const { name } = req.validatedData;
  const slug = convertToSlug(name);
  const tag = await tagService.createTag(name, slug);
  res.status(201).json({ tag });
}

async function updateTag(req, res) {
  const { id, name } = req.validatedData;
  const slug = convertToSlug(name);
  const tag = await tagService.updateTag(id, name, slug);
  res.status(200).json({ tag });
}

async function deleteTag(req, res) {
  const { id } = req.validatedData;
  await tagService.deleteTag(id);
  res.status(204).json();
}

export default { getPostsByTag, createTag, updateTag, deleteTag };
