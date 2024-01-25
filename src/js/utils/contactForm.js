const noModal = document.querySelector('.no-modal');
const modal = document.querySelector('#contact_modal');
const form = modal.querySelector('form');
const inputs = form.querySelectorAll('input, textarea');

function handleKeyDown(e) {
  // e.preventDefault();
  const focusedElement = document.activeElement;
  const currentInputIndex = Array.from(inputs).findIndex(
    (input) => input === focusedElement
  );
  const keyCode = e.key;
  switch (keyCode) {
    case 'Tab':
    case 'ArrowRight':
    case 'ArrowDown':
      if (currentInputIndex >= inputs.length - 1) {
        inputs[0].focus();
      } else {
        inputs[currentInputIndex + 1].focus();
      }
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      if (currentInputIndex <= 0) {
        inputs[inputs.length - 1].focus();
      } else {
        inputs[currentInputIndex - 1].focus();
      }
      break;
    case 'Enter':
      // form.submit();
      validate();
      break;
    case 'Escape':
      closeModal();
      break;
  }
}

function listenToKeyDown() {
  document.addEventListener('keydown', handleKeyDown);
}
function listentoSubmitForm() {
  form.addEventListener('submit', validate);
}

function removeAllListeners() {
  document.removeEventListener('keydown', handleKeyDown);
  form.removeEventListener('submit', validate);
}

function displayModal() {
  noModal.setAttribute('aria-hidden', 'true');
  noModal.style.opacity = 0.4;
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'block';
  inputs[0].focus();
  listenToKeyDown();
  listentoSubmitForm();
}

function closeModal() {
  noModal.setAttribute('aria-hidden', 'false');
  noModal.style.opacity = 1;
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  removeAllListeners();
}

function validate(e) {
  if (e) {
    e.preventDefault();
  }
  const firstName = inputs[0].value;
  const lastName = inputs[1].value;
  const email = inputs[2].value;
  const msg = inputs[3].value;
  if (firstName && lastName && email && msg) {
    console.log(firstName, lastName);
    console.log(email);
    console.log(msg);
    closeModal();
    return false;
  } else {
    return false;
  }
}
