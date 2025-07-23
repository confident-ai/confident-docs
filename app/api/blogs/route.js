import { getBlogs } from '@/functions/get-blogs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;
  const category = searchParams.get('category') || null;

  try {
    const blogs = await getBlogs(Number(page), Number(limit), category);
    return Response.json(blogs);
  } catch (err) {
    console.error('API Error:', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 