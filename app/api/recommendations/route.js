import { connectToDatabase } from '@/lib/mongodb';

// Simple TF-IDF implementation
function calculateSimilarity(query, bookKeywords) {
  const queryWords = query.toLowerCase().split(/\s+/);
  const bookWords = bookKeywords.map(k => k.toLowerCase());

  let matches = 0;
  queryWords.forEach(word => {
    bookWords.forEach(keyword => {
      if (keyword.includes(word) || word.includes(keyword)) {
        matches++;
      }
    });
  });

  // Calculate similarity score (0-100)
  const maxPossible = Math.max(queryWords.length, bookWords.length);
  return (matches / maxPossible) * 100;
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const { genre } = await request.json();

    if (!genre) {
      return Response.json({ success: false, error: 'Genre is required' }, { status: 400 });
    }

    // Fetch books from the selected genre
    const books = await db
      .collection('books')
      .find({ genre: genre.toLowerCase() })
      .toArray();

    if (books.length === 0) {
      return Response.json({ success: true, data: [] });
    }

    // Score and rank books by relevance
    const scoredBooks = books.map(book => ({
      ...book,
      matchScore: calculateSimilarity(genre, book.keywords || [])
    }));

    // Sort by score descending
    const rankedBooks = scoredBooks.sort((a, b) => b.matchScore - a.matchScore);

    // Return top 10
    const topBooks = rankedBooks.slice(0, 10);

    return Response.json({ success: true, data: topBooks });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}