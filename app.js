// Initialize Scanner with broad support for book barcodes
const scanner = new Html5QrcodeScanner("reader", { 
    fps: 10, 
    qrbox: 200,
    formatsToSupport: [ 1, 8, 12, 13 ] // EAN_8, EAN_13, UPC_A, ISBN
});

function onScanSuccess(decodedText) {
    processIsbn(decodedText);
}

function manualAdd() {
    const isbn = document.getElementById('manualIsbn').value;
    processIsbn(isbn);
}

async function processIsbn(isbn) {
    document.getElementById('result').innerText = `Searching... ${isbn}`;
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const data = await response.json();
        if (data.totalItems > 0) {
            const book = data.items[0].volumeInfo;
            saveBook({ title: book.title, author: book.authors ? book.authors[0] : "Unknown", isbn });
        } else {
            alert("Book not found.");
        }
    } catch (e) {
        alert("Error connecting to library.");
    }
}

function saveBook(book) {
    let collection = JSON.parse(localStorage.getItem('myBooks') || '[]');
    if (!collection.find(b => b.isbn === book.isbn)) {
        collection.push(book);
        localStorage.setItem('myBooks', JSON.stringify(collection));
        renderList();
    } else {
        alert("Already in your library!");
    }
}

function renderList() {
    const books = JSON.parse(localStorage.getItem('myBooks') || '[]');
    document.getElementById('bookList').innerHTML = '<h3>Collection</h3>' + 
        books.map(b => `<div class="book-item"><strong>${b.title}</strong><br>${b.author}</div>`).join('');
}

scanner.render(onScanSuccess);
renderList();