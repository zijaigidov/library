// ***** LIBRARY AND BOOK LOGIC *****

const library = [];
const main = document.querySelector('.main');

function Book(title, author, pages, imageURL, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.imageURL = imageURL;
  this.isRead = isRead;

  this.cardElement = this.createBookCard();
  this.addToLibrary();
  this.displayBook();
}

// Function for adding a book to the library
Book.prototype.addToLibrary = function () {
  library.push(this);
};

// Function for creating a book card
Book.prototype.createBookCard = function () {
  const card = document.createElement('article');
  card.classList.add('book-card');
  card.setAttribute('data-library-index', library.length);

  const cover = document.createElement('div');
  cover.classList.add('book-cover');
  cover.style.backgroundImage = `url('${this.imageURL}')`;
  card.appendChild(cover);

  const info = document.createElement('div');
  info.classList.add('book-info');
  card.appendChild(info);

  const title = document.createElement('h3');
  title.textContent = this.title;
  title.classList.add('title');
  info.appendChild(title);

  const author = document.createElement('p');
  author.textContent = this.author;
  info.appendChild(author);

  const pages = document.createElement('p');
  pages.textContent = `${this.pages} pages`;
  info.appendChild(pages);

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('btn-remove');
  const removeIcon = document.createElement('i');
  removeIcon.classList.add('fa-solid', 'fa-trash');
  removeBtn.appendChild(removeIcon);
  info.appendChild(removeBtn);

  removeBtn.addEventListener('click', () => {
    // Get the corresponding book element
    const bookElement = removeBtn.parentElement.parentElement;
    const index = bookElement.getAttribute('data-library-index');

    // Remove the element from the page and the library
    bookElement.remove();
    library.splice(index, 1);
  });

  const statusBtn = document.createElement('button');
  statusBtn.classList.add('btn-status');
  const statusIcon = document.createElement('i');

  if (this.isRead) statusIcon.classList.add('fa-solid', 'fa-circle-check');
  else statusIcon.classList.add('fa-solid', 'fa-circle-xmark');

  statusBtn.appendChild(statusIcon);
  info.appendChild(statusBtn);

  return card;
};

Book.prototype.displayBook = function () {
  main.appendChild(this.cardElement);
};

// ***** MODAL FOR ADDING BOOK *****

const bookModal = document.querySelector('dialog');
const btnOpenModal = document.getElementById('open-modal-btn');
const btnCloseModal = document.getElementById('close-modal-btn');

btnOpenModal.addEventListener('click', () => bookModal.showModal());
btnCloseModal.addEventListener('click', () => bookModal.close());

// ***** FORM VALIDATION *****

const bookForm = document.getElementById('book-form');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookPages = document.getElementById('book-pages');
const bookImageURL = document.getElementById('book-image-url');
const bookIsRead = document.getElementById('book-is-read');

const validatableInputs = [bookTitle, bookAuthor, bookPages, bookImageURL];
const errorMessages = bookForm.querySelectorAll('.error-msg');
const errorMessagesMap = new Map(
  validatableInputs.map((input, idx) => [input, errorMessages[idx]]),
);

bookForm.addEventListener('submit', (e) => handleFormSubmission(e));

function handleFormSubmission(e) {
  // To prevent the modal from automatically closing on submit
  e.preventDefault();

  clearValidation();
  setDefaultValidation();

  validateInput(bookTitle);
  validateInput(bookAuthor);
  validateInput(bookPages);
  validateInput(bookImageURL);

  if (bookForm.checkValidity()) {
    const newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      +bookPages.value,
      bookImageURL.value,
      bookIsRead.checked,
    );

    bookModal.close();
    bookForm.reset();
  }
}

bookModal.addEventListener('close', () => {
  clearValidation();
  bookForm.reset();
});

function validateInput(input) {
  if (!input.checkValidity()) {
    input.classList.replace('valid', 'invalid');
    const errorElement = errorMessagesMap.get(input);
    errorElement.style.visibility = 'visible';
    errorElement.textContent = getErrorMessage(input);
  }
}

function getErrorMessage(input) {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage = 'Please fill in the input field';
  } else if (input.validity.patternMismatch || input.validity.typeMismatch) {
    errorMessage = `Please fill in a valid ${input.getAttribute(
      'data-input-type',
    )}`;
  }
  return errorMessage;
}

function clearValidation() {
  errorMessagesMap.forEach((msg, input) => {
    input.classList.remove('valid', 'invalid');
    msg.style.visibility = 'hidden';
  });
}

function setDefaultValidation() {
  validatableInputs.forEach((input) => input.classList.add('valid'));
}
