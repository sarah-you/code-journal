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
}

$form.addEventListener('submit', saveEntry);

// Entries page elements;
const $entries = document.getElementById('entries');

function renderEntry(entry) {

  // div.row created
  const $row = document.createElement('div');
  $row.setAttribute('class', 'entry row');
  $entries.appendChild($row);

  // div for img created and img attribute
  const $imgColumn = document.createElement('div');
  $imgColumn.setAttribute('class', 'column-half');
  $row.appendChild($imgColumn);
  const $img = document.createElement('img');
  $imgColumn.appendChild($img);
  $img.setAttribute('src', data.entries.imgUrl);

  // ul element created and its text content
  const $ul = document.createElement('ul');
  $row.appendChild($ul);
  $ul.setAttribute('class', 'column-half');
  $ul.textContent = data.entries.title;

  // li element created and its text content
  const $list = document.createElement('li');
  $ul.appendChild($list);
  $list.textContent = data.entries.notes;
}

for (let i = 0; i < data.entries.length; i++) {
  $entries.appendChild(data.entries[i]);
}

document.addEventListener('DOMContentLoaded', renderEntry(data.entries));
