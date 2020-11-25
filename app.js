let domTitle = JSON.parse(localStorage.getItem('title'));

let domAuthor = JSON.parse(localStorage.getItem('author'));
let domIsbn = JSON.parse(localStorage.getItem('isbn'));
if (domTitle == null || domTitle == []) {
	let x = [];
	let y = [];
	let z = [];
	localStorage.setItem('title', JSON.stringify(x));
	localStorage.setItem('author', JSON.stringify(y));
	localStorage.setItem('isbn', JSON.stringify(z));
}
//  create the book class

class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

//  create the ui class to manupulate ui eliments

class Ui {
	addToTable(bookinfo) {
		const bookList = document.querySelector('#booklist');

		const createRow = document.createElement('tr');
		createRow.innerHTML = `
        <td>${bookinfo.title}</td>
        <td>${bookinfo.author}</td>
        <td>${bookinfo.isbn}</td>
        <td class='deleteitem'>x</td>

        `;
		if (domTitle.includes(bookinfo.title) == false) {
			domTitle.push(bookinfo.title);
			domAuthor.push(bookinfo.addBook);
			domIsbn.push(bookinfo.isbn);
			localStorage.setItem('title', JSON.stringify(domTitle));
			localStorage.setItem('author', JSON.stringify(domAuthor));
			localStorage.setItem('isbn', JSON.stringify(domIsbn));
		}
		bookList.appendChild(createRow);

		const clearfield = document.querySelectorAll('.clearfield');
		clearfield.forEach(function (n) {
			n.value = '';
		});
	}

	showAlert(msg, cls) {
		const createDiv = document.createElement('div');
		createDiv.className = `alert ${cls}`;
		createDiv.appendChild(document.createTextNode(msg));

		const container = document.querySelector('.container'),
			bookForm = document.querySelector('#book-form');

		container.insertBefore(createDiv, bookForm);

		setTimeout(function () {
			createDiv.remove();
		}, 1500);
	}
	deleteFromTable(cross) {
		if (cross.className == 'deleteitem') {
			cross.parentElement.remove();
		}

		let findIndex = domTitle.indexOf(
			cross.parentElement.children[0].textContent
		);
		domTitle.splice(findIndex, 1);
		domAuthor.splice(findIndex, 1);
		domIsbn.splice(findIndex, 1);
		localStorage.setItem('title', JSON.stringify(domTitle));
		localStorage.setItem('author', JSON.stringify(domAuthor));
		localStorage.setItem('isbn', JSON.stringify(domIsbn));
	}
}

//  manupulate data from local storage

document.addEventListener('DOMContentLoaded', function () {
	if (domTitle.length != 0) {
		for (i = 0; i < domTitle.length; i++) {
			const bookInstance2 = new Book(domTitle[i], domAuthor[i], domIsbn[i]);
			const uiInstance3 = new Ui();
			uiInstance3.addToTable(bookInstance2);
		}
	}
});

//  get element from form and do actions

document.querySelector('#book-form').addEventListener('submit', addBook);

//  create addBook function

function addBook(e) {
	const title = document.querySelector('#title').value,
		author = document.querySelector('#author').value,
		isbn = document.querySelector('#isbn').value;

	const bookInstance = new Book(title, author, isbn);
	const uiInstance = new Ui();
	if (title == '' || author == '' || isbn == '') {
		uiInstance.showAlert('Please fill out all fields.', 'error');
	} else {
		if (domTitle.includes(bookInstance.title) == false) {
			uiInstance.addToTable(bookInstance);
			uiInstance.showAlert('Book has successfully added', 'success');
		} else {
			uiInstance.showAlert('Sorry,the book has already in the list', 'error');
		}
	}
	e.preventDefault();
}

//  delete book from list function

document.querySelector('#booklist').addEventListener('click', function (e) {
	let uiInstance2 = new Ui();
	if (confirm('Are you sure you want to delete the book from list?')) {
		uiInstance2.deleteFromTable(e.target);
		uiInstance2.showAlert('Book has removed', 'success');
	}
});
