import { createClient } from "contentful";

export async function getServerSideProps({ res }) {
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

  const allUrls = [
    ...staticPaths.map(path => `${siteUrl}/${path}`),
    ...blogLinks.map(link => `${siteUrl}/blog/${link}`),
    ...caseStudyLinks.map(link => `${siteUrl}/case-study/${link}`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    url => `<url>
                <loc>${url}</loc>
            </url>`
  )
  .join("\n")} </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
