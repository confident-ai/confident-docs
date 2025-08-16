import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getBlogs = async (
  page = 1,
  limit = 10,
  category = null,
  excludeSlug = null
) => {
  let query = {
    content_type: "article",
    limit: limit + (excludeSlug ? 1 : 0),
    skip: (page - 1) * limit,
    order: "-fields.createdDate",
  };

  if (category && category !== "all") {
    const capitalizedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);
    query["fields.category"] = capitalizedCategory;
  }

  const entries = await client.getEntries(query);

  let items = entries.items;
  if (excludeSlug) {
    items = items.filter(item => item.fields.link !== excludeSlug);
    items = items.slice(0, limit);
  }

  return {
    items,
    total: entries.total - (excludeSlug ? 1 : 0),
  };
};
export const getBlog = async slug => {
  const entries = await client.getEntries({
    content_type: "article",
    "fields.link": slug,
    limit: 1,
  });
  return entries.items[0];
};
