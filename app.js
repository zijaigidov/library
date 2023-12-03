const library = [];

function Book(title, author, pages, imageURL, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.imageURL = imageURL;
  this.isRead = isRead;
}

Book.prototype.addToLibrary = function () {
  library.push(this);
};

// Modal for adding book to library
const bookModal = document.querySelector('dialog');
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');

btnOpenModal.addEventListener('click', () => bookModal.showModal());
btnCloseModal.addEventListener('click', () => bookModal.close());

// Validation for book form
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
  // Prevent the modal from automatically closing on submit
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
    newBook.addToLibrary();

    bookModal.close();
    bookForm.reset();
  }
}

// Clear the validation styles and input fields when the user closes the modal
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
