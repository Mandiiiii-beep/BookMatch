// components/BookList.js

export default function BookList({ books }) {
  if (books.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <p className="text-lg font-semibold text-slate-500">No books found in this genre.</p>
      </div>
    );
  }

  return (
    <div className="shelf-scroll flex gap-5 overflow-x-auto pb-5">
      {books.map((book) => (
        <div
          key={book._id || book.title}
          className="group min-w-[154px] max-w-[154px] sm:min-w-[174px] sm:max-w-[174px]"
        >
          <div
            className="book-cover transition duration-300 group-hover:-translate-y-1"
            style={{ backgroundColor: ['#4f46e5', '#e85d75', '#d3922e', '#263248', '#16866d'][books.indexOf(book) % 5] }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-80">BookMatch edit</span>
            <span className="text-center font-black leading-tight">{book.title}</span>
            <span className="text-[10px] font-semibold opacity-90">{book.author}</span>
          </div>
          <div className="pt-3">
            <h3 className="line-clamp-2 text-sm font-black leading-snug text-slate-800">{book.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{book.author}</p>
            <p className="mt-2 text-xs font-bold text-amber-500">★ {book.rating || 'New'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}