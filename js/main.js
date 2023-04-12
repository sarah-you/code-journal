// listen for photo preview
const $inputUrl = document.getElementById('photo-url');
const $imgSrc = document.querySelector('img');

$inputUrl.addEventListener('input', previewPhoto);

function previewPhoto(event) {
  const $inputUrl = event.target.value;
  $imgSrc.setAttribute('src', $inputUrl);
}

// listen for user form input and submission
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
  // renderEntry(userInput);
}

$form.addEventListener('submit', saveEntry);

function renderEntry(entry) {
  // li element and its text content
  const $title = document.createElement('li');
  $title.textContent = entry.title;
  $title.setAttribute('class', 'column-half');

  const $img = document.createElement('img');
  $title.appendChild($img);
  $img.setAttribute('src', entry.imgUrl);

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $title.appendChild($notes);

  return $title;
}

const $ul = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
});
