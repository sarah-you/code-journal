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

// adding in dummy entries
// const entry = [
//   {
//     img: 'images/placeholder-image-square.jpg',
//     title: 'Cats',
//     notes: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, aut harum nisi atque et quibusdam debitis nobis fugiat voluptatum illo repellendus iure non quos. Ad corrupti modi libero facere culpa!'
//   },
//   {
//     img: 'images/placeholder-image-square.jpg',
//     title: 'Cats 2',
//     notes: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Delectus, aut harum nisi atque et quibusdam debitis nobis fugiat voluptatum illo repellendus iure non quos.Ad corrupti modi libero facere culpa!'
//   }
// ];

const $entries = document.getElementById('entries');

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
$img.setAttribute('src', 'https://www.scotsman.com/webimg/b25lY21zOjY4N2ZhYmI3LTgyODgtNDQxNy1hMzIxLWZmMDI1Mzg4NGY2OTpkMGM4MTM0Yi05Mjk0LTRiMDQtYTBhNS1hODQwMTUxOWZlODY=.jpg?width=1200&enable=upscale');

// ul element created and its text content
const $ul = document.createElement('ul');
$row.appendChild($ul);
$ul.setAttribute('class', 'column-half');
$ul.textContent = 'Cats';

// li element created and its text content
const $list = document.createElement('li');
$ul.appendChild($list);
$list.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, aut harum nisi atque et quibusdam debitis nobis fugiat voluptatum illo repellendus iure non quos. Ad corrupti modi libero facere culpa!';

// div.row for next entry created
const $rowTwo = document.createElement('div');
$rowTwo.setAttribute('class', 'entry row');
$entries.appendChild($rowTwo);

// div for img entry 2 and its attribute
const $imgColumnTwo = document.createElement('div');
$imgColumnTwo.setAttribute('class', 'column-half');
$rowTwo.appendChild($imgColumnTwo);
const $imgTwo = document.createElement('img');
$imgColumnTwo.appendChild($imgTwo);
$imgTwo.setAttribute('src', 'https://api.time.com/wp-content/uploads/2014/11/140372563.jpg');

// ul element for second entry and its content;
const $ulTwo = document.createElement('ul');
$rowTwo.appendChild($ulTwo);
$ulTwo.setAttribute('class', 'column-half');
$ulTwo.textContent = 'Cats Two';

// li element for second entry and its content;
const $listTwo = document.createElement('li');
$ulTwo.appendChild($listTwo);
$listTwo.textContent = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis officia dolorem vero explicabo assumenda a eaque mollitia laborum voluptatibus sapiente, nihil, nisi minus quidem sit ducimus quis modi ipsa ullam!';
