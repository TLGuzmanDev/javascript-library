let myLibrary = [];
let form = document.querySelector('#book-form');
let bookDisplay = document.querySelector('#books');
let showFormBtn = document.querySelector('#add-book button');

function Book(title, author, pages, read, index=undefined) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, `
    + `${(this.read) ? 'Have Read': 'Have Not Read'}`;
};

Book.prototype.toggleRead = function() {
    (this.read) ? this.read = false: this.read = true;
};

function addBookToLibrary(title, author, pages, read, index) {
    book = new Book(title, author, pages, read, index);
    myLibrary[index] = book;
    console.log(`added book: ${book.info()}, index: ${book.index}`);
    return book;
}

form.addEventListener('submit', function(e) {
    let data = new FormData(form);
    let title = data.get('title');
    let author = data.get('author');
    let pages = data.get('pages');
    let read = data.get('read');
    read = Number(read) ? true: false;

    let book = addBookToLibrary(title, author, pages, read, myLibrary.length);
    render();
    e.preventDefault();
});

function render() {
    bookDisplay.textContent = '';
    myLibrary.forEach(book => {
        createBookElement(book);
    })
    console.log('rendered all books');
}

function createBookElement(book) {
    let element = document.createElement('div');
    element.classList.toggle(`book`);
    element.setAttribute('id', `book-${book.index}`)

    let title = document.createElement('div');
    title.classList.toggle('title');
    title.textContent = book.title;
    element.appendChild(title);

    let author = document.createElement('div');
    author.classList.toggle('author');
    author.textContent = 'by '+ book.author;
    element.appendChild(author);

    let pages = document.createElement('div');
    pages.classList.toggle('pages');
    pages.textContent = book.pages + ' pages';
    element.appendChild(pages);

    let read = document.createElement('div');
    read.classList.toggle('read');
    read.textContent = (book.read) ? 'Have Read': 'Have Not Read';
    element.appendChild(read);

    let readToggleBtn = document.createElement('button');
    readToggleBtn.type = 'button';
    readToggleBtn.textContent = 'Toggle Read';
    readToggleBtn.addEventListener('click', () => {
        book.toggleRead();
        console.log(`toggled read on: ${book.index}`)
        render();
    });
    element.appendChild(readToggleBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete Book';
    deleteBtn.addEventListener('click', () => deleteBook(book));
    element.appendChild(deleteBtn);

    bookDisplay.appendChild(element);
    console.log(`created book element: ${book.index}`);
}

function deleteBook(book) {
    delete myLibrary[book.index];
    console.log(`deleted book: ${book.info()}, index: ${book.index}`);
    render();
}

showFormBtn.addEventListener('click', () => {
    if (form.style.display === 'none') {
        form.style.display = 'grid';
    } else {
        form.style.display = 'none';
    }
});