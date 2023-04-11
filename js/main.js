const $inputUrl = document.getElementById('photo-url');
const $imgSrc = document.querySelector('img');

$inputUrl.addEventListener('input', previewPhoto);

function previewPhoto(event) {
  const $inputUrl = event.target.value;
  $imgSrc.setAttribute('src', $inputUrl);
}

const $form = document.querySelector('form');

function saveEntry(event) {
  event.preventDefault();
  const userInput = {};
  userInput.title = event.target.elements.title.value;
  userInput.imgUrl = event.target.elements.photo.value;
  userInput.notes = event.target.elements.notes.value;
  userInput.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(userInput);
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', saveEntry);
