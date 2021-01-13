loadBooks()

const submitButton = document.querySelector('form button');
submitButton.addEventListener('click', addBook);

const loadButton = document.querySelector('#loadBooks');
loadButton.addEventListener('click', loadBooks);

function loadBooks() {

    fetch('https://starting-project-475cc.firebaseio.com/book-list.json')
        .then(res => res.json())
        .then(books => {

            const tbody = document.querySelector('tbody');

            tbody.innerHTML = '';

            for (let key in books) {
                let book = books[key];

                const tr = document.createElement('tr');
                tr.setAttribute('data-id', key);

                const titleTd = document.createElement('td');
                titleTd.textContent = book.title;
                const authorTd = document.createElement('td');
                authorTd.textContent = book.author;
                const isbnTd = document.createElement('td');
                isbnTd.textContent = book.isbn;

                const buttonsTd = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', (e) => {

                    if (e.target.textContent == 'Edit') editBook(e);
                    else saveChanges(e)
                })
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', deleteBook);

                buttonsTd.appendChild(editButton);
                buttonsTd.appendChild(deleteButton);

                tr.appendChild(titleTd);
                tr.appendChild(authorTd);
                tr.appendChild(isbnTd);
                tr.appendChild(buttonsTd);

                tbody.appendChild(tr);
            }
        })
}

function saveChanges(e) {

    const parentTr = e.target.parentElement.parentElement;

    if (parentTr.querySelector('td').textContent !== '') return;

    const titleInput = parentTr.querySelectorAll('td input')[0];
    const authorInput = parentTr.querySelectorAll('td input')[1];
    const isbnInput = parentTr.querySelectorAll('td input')[2];
    
    let bookObj = {
        title: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value
    }

    fetch(`https://starting-project-475cc.firebaseio.com/book-list/${parentTr.getAttribute('data-id')}.json`, {
        method: "PUT",
        body: JSON.stringify(bookObj)
    })
        .then(async () => {
            await loadBooks()
            e.target.textContent = 'Edit';
        })
}

function deleteBook(e) {

    let id = e.target.parentElement.parentElement.getAttribute('data-id');

    fetch(`https://starting-project-475cc.firebaseio.com/book-list/${id}.json`, { method: "DELETE" })
        .then(() => loadBooks())
}

function editBook(e) {
    
    if (e.target.tagName !== 'BUTTON') return;

    let tr = e.target.parentElement.parentElement;
    
    const titleTd = tr.querySelectorAll('td')[0];
    const titleInput = document.createElement('input');
    titleInput.value = titleTd.textContent;
    titleTd.textContent = '';
    titleTd.appendChild(titleInput);

    const authorTd = tr.querySelectorAll('td')[1];
    const authorInput = document.createElement('input');
    authorInput.value = authorTd.textContent;
    authorTd.textContent = '';
    authorTd.appendChild(authorInput);

    const isbnTd = tr.querySelectorAll('td')[2];
    const isbnInput = document.createElement('input');
    isbnInput.value = isbnTd.textContent;
    isbnTd.textContent = '';
    isbnTd.appendChild(isbnInput);

    e.target.textContent = 'Save';
}

function addBook(e) {

    e.preventDefault();

    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const isbnInput = document.querySelector('#isbn');

    if (titleInput.value == '' || authorInput.value == '' || isbnInput.value == '') return;

    let bookObj = {
        title: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value
    }

    fetch('https://starting-project-475cc.firebaseio.com/book-list.json', {
        method: "POST",
        body: JSON.stringify(bookObj)
    })
        .then(() => loadBooks())

    titleInput.value = '';
    authorInput.value = '';
    isbnInput.value = '';
}

