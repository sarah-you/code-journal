const $inputUrl = document.getElementById('photo-url');
const $imgSrc = document.querySelector('img');

$inputUrl.addEventListener('input', previewPhoto);

function previewPhoto(event) {
  const $inputUrl = event.target.value;
  $imgSrc.setAttribute('src', $inputUrl);
}

const $submit = document.querySelector('button');

$submit.addEventListener('click', saveEntry);

function saveEntry(event) {
  event.preventDefault();

}
