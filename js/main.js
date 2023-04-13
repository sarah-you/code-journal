// listen for photo preview
const $inputUrl = document.getElementById('photo-url');
const $imgSrc = document.querySelector('img');
const $ul = document.querySelector('ul');
const $nav = document.querySelector('a');
const $entryForm = document.getElementById('entry-form');
const $entries = document.getElementById('entries');
const $newButton = document.querySelector('.new-button');

$inputUrl.addEventListener('input', function previewPhoto(event) {
  const $inputUrl = event.target.value;
  $imgSrc.setAttribute('src', $inputUrl);
});

// listen for user form input and form submission
const $form = document.querySelector('form');

$form.addEventListener('submit', function saveEntry(event) {
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
  $ul.prepend(renderEntry(userInput)); // allows forms to be added without having to refresh webpage
  viewSwap('entries');
});

// append user input to DOM tree
function renderEntry(entry) {
  const $list = document.createElement('li');
  $list.setAttribute('data-entry-id', entry.entryId);

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $list.appendChild($row);

  const $colOneHalf = document.createElement('div');
  $colOneHalf.setAttribute('class', 'column-half');
  $row.appendChild($colOneHalf);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.imgUrl);
  $colOneHalf.appendChild($img);

  const $colTwoHalf = document.createElement('div');
  $colTwoHalf.setAttribute('class', 'column-half');
  $row.appendChild($colTwoHalf);

  const $title = document.createElement('h3');
  $colTwoHalf.appendChild($title);
  $title.textContent = entry.title;

  // const $editIcon = document.createElement('i');
  // $colTwoHalf.appendChild($editIcon);
  // $editIcon.setAttribute('className', 'fa-solid fa-pen');

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $colTwoHalf.appendChild($notes);

  return $list;
}
// adds the user input to DOM tree below <ul> when page refreshes
document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view); // loads the same page after refreshing
  toggleNoEntries();
});

// switch to show or hide no entry text
const $noEntries = document.querySelector('.center');
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntries.setAttribute('class', 'hidden center');
  } else {
    $noEntries.setAttribute('class', 'center');
  }
}

// viewswapping between entries and entry-form pages
function viewSwap(viewName) {
  if (viewName === 'entry-form') {
    $entries.setAttribute('class', 'hidden');
    $entryForm.setAttribute('class', 'display');
    data.view = viewName;
    toggleNoEntries();
  } else {
    $entries.setAttribute('class', 'display');
    $entryForm.setAttribute('class', 'hidden');
    data.view = viewName;
    toggleNoEntries();
  }
}

$nav.addEventListener('click', function () {
  viewSwap('entries');
});

$newButton.addEventListener('click', function () {
  viewSwap('entry-form');
});
