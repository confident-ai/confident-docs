import { createClient } from "contentful";

export const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getBlogs = async (page = 1, limit = 10, category = null) => {
    
    const entries = await client.getEntries({
        content_type: "article",
        limit: limit,
        skip: (page - 1) * limit,
    });

    return {
        items: entries.items,
        total: entries.total,
    };
};


export const getBlog = async (slug) => {
    const entries = await client.getEntries({
        content_type: "article",
        "fields.link": slug,
        limit: 1,
    });
    return entries.items[0];
};