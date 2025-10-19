// ====== TÌM KIẾM SÁCH ======
async function searchBooks() {
  const query = document.querySelector('.search-box input').value.trim();
  if (!query) return;

  try {
    const response = await fetch(`http://127.0.0.1:5000/api/search?q=${encodeURIComponent(query)}`);
    const books = await response.json();

    const resultSection = document.getElementById('search-results');
    resultSection.innerHTML = '';

    if (books.length === 0) {
      resultSection.innerHTML = '<p>Không tìm thấy sách nào.</p>';
      return;
    }

    books.forEach(book => {
      const div = document.createElement('div');
      div.className = 'book-card';
      div.innerHTML = `
        <h3>${book.title}</h3>
        <p><b>Tác giả:</b> ${book.author}</p>
        <p>${book.description}</p>
        ${book.pdf ? `<button onclick="openBook('${book.pdf}')">Đọc sách</button>` : '<p>Không có PDF.</p>'}
      `;
      resultSection.appendChild(div);
    });
  } catch (error) {
    console.error('Lỗi khi tìm kiếm:', error);
  }
}

// ====== MỞ FILE PDF TRỰC TIẾP ======
function openBook(pdfUrl) {
  const viewer = document.createElement('iframe');
  viewer.src = `http://127.0.0.1:5000${pdfUrl}`;
  viewer.className = 'pdf-viewer';
  document.body.appendChild(viewer);
}

// ====== GẮN SỰ KIỆN ======
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.search-box button');
  btn.addEventListener('click', searchBooks);
});
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ JS loaded OK");
  const btn = document.querySelector('.search-box button');
  btn.addEventListener('click', () => {
    console.log("🔍 Nút tìm kiếm đã được bấm!");
    searchBooks();
  });
});
