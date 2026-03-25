import { tagService } from '../services/index.js';
import { errors } from '../helpers/index.js';
import convertToSlug from '../config/slugify.js';

async function getTagWithPublishedPosts(req, res) {
  const { slug } = req.validatedData;
  const tag = await tagService.findTagWithPublishedPosts(slug);
  if (!tag) {
    throw new errors.GenericError('Tag not found', 404);
  }
  res.status(200).json({ tag });
}

async function getTagsWithPostCount(req, res) {
  const tags = await tagService.findTagsWithPostCount();
  res.status(200).json({ tags });
}

async function getAllTags(req, res) {
  const tags = await tagService.findAllTags();
  res.status(200).json({ tags });
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

export default { getTagWithPublishedPosts, getTagsWithPostCount, getAllTags, createTag, updateTag, deleteTag };
