
const sourceContainer = document.getElementById('source-container');
const dropContainer = document.getElementById('drop-container');
const successMessage = document.getElementById('success-message');
sourceContainer.addEventListener('dragstart', dragStart);
dropContainer.addEventListener('dragenter', dragEnter);
dropContainer.addEventListener('dragover', dragOver);
dropContainer.addEventListener('dragleave', dragLeave);
dropContainer.addEventListener('drop', drop);

let draggedItem = null;

function dragStart(event) {
    draggedItem = event.target;
    event.dataTransfer.setData('text/plain', event.target.innerHTML);
    this.classList.add('dragging');
}

function dragEnter(event) {
    event.preventDefault();
    this.classList.add('highlight');
}

function dragOver(event) {
    event.preventDefault();
}

function dragLeave() {
    this.classList.remove('highlight');
}

function drop(event) {
    event.preventDefault();
    this.classList.remove('highlight');
    const data = event.dataTransfer.getData('text/plain');
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = data;
    this.appendChild(newItem);
    sourceContainer.removeChild(draggedItem);
    draggedItem = null;
    showSuccessMessage();
}

function showSuccessMessage() {
    successMessage.textContent = 'Item dropped successfully!';
}

function resetContainers() {
    dropContainer.innerHTML = '';
    successMessage.textContent = '';
    while (sourceContainer.firstChild) {
      sourceContainer.removeChild(sourceContainer.firstChild);
    }
    ['Item 1', 'Item 2', 'Item 3'].forEach(item => {
      const newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.draggable = true;
      newItem.innerHTML = item;
      sourceContainer.appendChild(newItem);
    });
}