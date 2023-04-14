// global variables
const $inputUrl = document.getElementById('photo-url');
const $imgSrc = document.querySelector('img');
const $ul = document.querySelector('ul');
const $nav = document.querySelector('a');
const $entryForm = document.getElementById('entry-form');
const $entries = document.getElementById('entries');
const $newButton = document.querySelector('.new-button');

// listen for photo preview -- once user inputs image address, photo preview shows
$inputUrl.addEventListener('input', function previewPhoto(event) {
  const $inputUrl = event.target.value;
  $imgSrc.setAttribute('src', $inputUrl);
});

// listen for user form input and form submission -- adds user's form input to data object (data.js) and submits form to be added to entries tab
const $form = document.querySelector('form');

$form.addEventListener('submit', function saveEntry(event) {
  event.preventDefault();
  if (data.editing === null) {
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
  } else {
    const editInput = {};
    editInput.entryId = data.editing.entryId;
    editInput.title = event.target.elements.title.value;
    editInput.imgUrl = event.target.elements.photo.value;
    editInput.notes = event.target.elements.notes.value;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === editInput.entryId) {
        data.entries[i] = editInput;
      }
    }
    const $updatedForm = renderEntry(editInput);
    const $liElements = document.querySelectorAll('li');
    for (let i = 0; i < $liElements.length; i++) {
      if (editInput.entryId === Number($liElements[i].getAttribute('data-entry-id'))) {
        $liElements[i].replaceWith($updatedForm);
      }
    }
  }
  $form.reset();
  viewSwap('entries');
});

// append user input to DOM tree -- updates the webpage with these elements without affecting HTML directly
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

  const $editWrap = document.createElement('div');
  $editWrap.setAttribute('class', 'edit');
  $colTwoHalf.appendChild($editWrap);

  const $title = document.createElement('h3');
  $editWrap.appendChild($title);
  $title.textContent = entry.title;

  const $penIcon = document.createElement('i');
  $penIcon.className = 'fa-solid fa-pen';
  $editWrap.appendChild($penIcon);

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

// shows Entries page when the Entries tab is clicked
$nav.addEventListener('click', function () {
  viewSwap('entries');
});

// shows the Entry Form page when NEW button is clicked
$newButton.addEventListener('click', function () {
  viewSwap('entry-form');
});

// switch to Edit Entries page when pen icon is clicked
$ul.addEventListener('click', function (event) {
  viewSwap('entry-form');
  const $li = event.target.closest('li'); // grabs the closest <li> element from the event (pen icon);
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === Number($li.getAttribute('data-entry-id'))) {
      data.editing = data.entries[i];
    }
  }
  // (above) loops through data entries (each form) in data.js to find the entryId that matches the one from the current selected <li> and adds it to data object's editing property

  const $editTitle = document.querySelector('#title');
  $editTitle.value = data.editing.title;
  const $editImg = document.querySelector('#photo-url');
  $editImg.value = data.editing.imgUrl;
  const $editImgSrc = document.querySelector('img');
  $editImgSrc.src = data.editing.imgUrl;
  const $editNotes = document.querySelector('#notes');
  $editNotes.value = data.editing.notes;
  // (above) grabs the title, image url input, image src, and notes input value from the user's past (selected) entry using main.js data object's editing

  // changes the New Entry page heading to Edit Entries
  const $pageName = document.querySelector('h1');
  $pageName.textContent = 'Edit Entries';
});
