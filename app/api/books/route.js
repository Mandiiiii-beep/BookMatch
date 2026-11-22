import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const requestedLimit = Number.parseInt(searchParams.get('limit') || '50', 10);
    const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 50;

    let query = {};
    if (genre) {
      query = { genre: genre.toLowerCase() };
    }

    const books = await db
      .collection('books')
      .find(query)
      .sort({ _id: -1 })
      .limit(limit)
      .toArray();

    return Response.json({ success: true, data: books });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    const result = await db.collection('books').insertOne(body);

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}