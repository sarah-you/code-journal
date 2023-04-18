// global variables
const $inputUrl = document.getElementById('photo-url');
const $imgSrc = document.querySelector('img');
const $ul = document.querySelector('ul');
const $nav = document.querySelector('a');
const $entryForm = document.getElementById('entry-form');
const $entries = document.getElementById('entries');
const $newButton = document.querySelector('.new-button');
const $pageName = document.querySelector('h1');
const $delButton = document.querySelector('#del-button');

// listen for photo preview -- once user inputs image address, photo preview shows
$inputUrl.addEventListener('input', function previewPhoto(event) {
  const $inputUrl = event.target.value;
  $imgSrc.setAttribute('src', $inputUrl);
});

// listen for user form input and form submission -- adds user's form input to data object (data.js) and submits form to be added to entries tab
const $form = document.querySelector('form');

$form.addEventListener('submit', function saveEntry(event) {
  event.preventDefault();
  // if there's no entry form being edited, perform standard functionally for new entry
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
    $ul.prepend(renderEntry(data.entries[0])); // allows forms to be added without having to refresh webpage
    // if there's entry form that's being edited, add the updated input into the current form being edited
  } else {
    const $liElements = document.querySelectorAll('li');
    const editInput = {};
    editInput.entryId = data.editing.entryId;
    editInput.title = event.target.elements.title.value;
    editInput.imgUrl = event.target.elements.photo.value;
    editInput.notes = event.target.elements.notes.value;
    // loop through the data entries array (data.js) and find the entryId that matches the current edited form's entryId and add the updated input values to it
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === editInput.entryId) {
        data.entries[i] = editInput;
        const $updatedForm = renderEntry(editInput);
        $liElements[i].replaceWith($updatedForm);
      }
    }
  }

  // add the edited form to the DOM tree using renderEntry function and find the list element (the entry form) that needs to be replaced with the updated version and replace it

  // reset the form and switch to entries view to show the updated forms after the edits with the rest of the entries
  $form.reset();
  data.editing = null;
  toggleNoEntries();
  data.view = 'entries';
  viewSwap('entries');
});

// append user input to DOM tree -- updates the webpage with these elements without affecting HTML directly
function renderEntry(entry) {
  const $list = document.createElement('li');
  // $list.setAttribute('data-entry-id', entry.entryId);

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
  $penIcon.setAttribute('data-entry-id', entry.entryId);
  $penIcon.addEventListener('click', editPencil);
  $editWrap.appendChild($penIcon);

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $colTwoHalf.appendChild($notes);

  return $list;
}

function editPencil(event) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === Number(event.target.dataset.entryId)) {
      data.editing = data.entries[i];
      const $editTitle = document.querySelector('#title');
      $editTitle.value = data.editing.title;
      const $editImg = document.querySelector('#photo-url');
      $editImg.value = data.editing.imgUrl;
      const $editImgSrc = document.querySelector('img');
      $editImgSrc.src = data.editing.imgUrl;
      const $editNotes = document.querySelector('#notes');
      $editNotes.value = data.editing.notes;
      $pageName.textContent = 'Edit Entries';
      $delButton.setAttribute('class', 'display');
      data.view = 'entry-form';
      viewSwap('entry-form');
    }
    // (above) loops through data entries (each form) in data.js to find the entryId that matches the one from the current selected <li> and adds it to data object's editing property
    // (above) grabs the title, image url input, image src, and notes input value from the user's past (selected) entry using main.js data object's editing

    // changes the New Entry page heading to Edit Entries

  }
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
const $noEntries = document.querySelector('#center');
function toggleNoEntries() {
  if (data.entries.length < 1) {
    $noEntries.className = 'center';
  } else {
    $noEntries.className = 'hidden';
  }
}

// viewswapping between entries and entry-form pages
function viewSwap(viewName) {
  if (viewName === 'entry-form') {
    $entries.classList.add('hidden');
    $entryForm.classList.remove('hidden');
    data.view = viewName;
  } else if (viewName === 'entries') {
    $entryForm.classList.add('hidden');
    $entries.classList.remove('hidden');
    data.view = viewName;
  }
}

// shows Entries page when the Entries tab is clicked
$nav.addEventListener('click', function () {
  data.view = 'entries';
  viewSwap('entries');
});

// shows the Entry Form page when NEW button is clicked
$newButton.addEventListener('click', function () {
  $form.reset();
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  $pageName.textContent = 'New Entries';
  data.view = 'entry-form';
  viewSwap('entry-form');
});

const $modal = document.querySelector('.modal');
// modal pop up when user clicks delete entry
$delButton.addEventListener('click', function (event) {
  $modal.classList.remove('hidden');
});

const $modalCancelBtn = document.querySelector('.cancel');
$modalCancelBtn.addEventListener('click', function () {
  $modal.classList.add('hidden');
});
const $modalConfirmBtn = document.querySelector('.confirm');

$modalConfirmBtn.addEventListener('click', function () {
  $modal.classList.add('hidden');
  const $li = document.querySelectorAll('li');
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === Number(data.editing.entryId)) {
      data.entries.splice([i], 1);
      $ul.removeChild($li[i]);
      data.editing = null;
      data.view = 'entries';
      viewSwap('entries');
      toggleNoEntries();
    }
  }
});
