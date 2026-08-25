import { connectToDatabase } from '@/lib/mongodb';
import sampleBooks from '@/data/sampleBooks.json';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();

    // Clear existing books (optional - remove this line if you want to keep existing data)
    await db.collection('books').deleteMany({});

    // Insert sample books
    const result = await db.collection('books').insertMany(sampleBooks);

    return Response.json({
      success: true,
      message: `Inserted ${result.insertedCount} books into database`
    });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}