// Modal for adding book to library

const bookModal = document.querySelector('dialog');
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const bookForm = document.getElementById('book-form');

btnOpenModal.addEventListener('click', () => {
  bookModal.showModal();
});

btnCloseModal.addEventListener('click', () => {
  bookModal.close();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  bookModal.close();
});
