/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function beforeUnload(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('journal entries', dataJSON);
}

window.addEventListener('beforeunload', beforeUnload);

const previousEntries = localStorage.getItem('journal entries');
if (previousEntries === data) {
  data = JSON.parse(previousEntries);
}
