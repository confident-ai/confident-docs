import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getCase = async slug => {
  const entries = await client.getEntries({
    content_type: "caseStudies",
    "fields.link": slug,
    limit: 1,
  });
  return entries.items[0];
};
