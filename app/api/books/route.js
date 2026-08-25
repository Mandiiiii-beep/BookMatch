import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');

    let query = {};
    if (genre) {
      query = { genre: genre.toLowerCase() };
    }

    const books = await db
      .collection('books')
      .find(query)
      .limit(50)
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