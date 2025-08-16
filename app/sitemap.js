import { createClient } from "contentful";

export default async function sitemap() {
  const siteUrl = "https://www.confident-ai.com";

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const entries = await client.getEntries({
    content_type: "article",
    select: "fields.link",
  });

  const caseStudies = await client.getEntries({
    content_type: "caseStudies",
    select: "fields.link",
  });

  const blogLinks = entries.items.map(item => item.fields.link);
  const caseStudyLinks = caseStudies.items.map(item => item.fields.link);

  const staticPaths = [
    "",
    "products/llm-evaluation",
    "products/llm-observability",
    "book-a-demo",
    "privacy-policy",
    "terms",
    "pricing",
    "careers",
    "blog",
  ];

  return [
    // Static pages
    ...staticPaths.map(path => ({
      url: `${siteUrl}/${path}`,
    })),

    // Blog articles
    ...blogLinks.map(link => ({
      url: `${siteUrl}/blog/${link}`,
    })),

    // Case studies
    ...caseStudyLinks.map(link => ({
      url: `${siteUrl}/case-study/${link}`,
    })),
  ];
}
