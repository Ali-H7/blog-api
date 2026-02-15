import slugify from 'slugify';

const options = {
  replacement: '-',
  remove: undefined,
  lower: true,
  strict: false,
  locale: 'en',
  trim: true,
};

function convertToSlug(string) {
  return slugify(string, options);
}

export default convertToSlug;
