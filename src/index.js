import './style.css';
import { addTodo, editTodo } from './modules/crud.js';
import updateTodo from './modules/update.js';

/* VARIABLES */
const localTodos = localStorage.getItem('todosStore');
let todos = [];

if (localTodos) {
  todos = JSON.parse(localTodos);
}

const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');
const addInput = document.getElementById('todo-input');
const removeCompleted = document.getElementById('remove-completed');

/* CLASSES */
class Todo {
  constructor(description, arr) {
    this.description = description;
    this.completed = false;
    this.index = arr.length + 1;
  }
}

/* FUNCTIONS */

const renderList = () => {
  todos.forEach((element, index) => {
    element.index = index + 1;
  });
  todoList.innerHTML = '';
  for (let i = 0; i < todos.length; i += 1) {
    const content = `
    <li class="list-item" id="list${todos[i].index}" >
      <input id="${todos[i].index}" class="checkbox" type="checkbox" name="vehicle1" ${todos[i].completed ? 'checked' : ''}>
      <input id="${todos[i].index}" class="input-task1" type="text" readonly value="${todos[i].description}"/>
      <button id="${todos[i].index}" class="btn-remove edit">
        <i id="${todos[i].index}" class="fas fa-ellipsis-v edit"></i>
      </button>
      <button id="${todos[i].index}" class="btn-remove delete hidden">
        <i id="${todos[i].index}" class="fas fa-trash-alt delete"></i>
      </button>
    </li>
    `;
    todoList.innerHTML += content;
  }
};

renderList();

/*  EVENT LISTENERS add */
addBtn.addEventListener('click', () => {
  addTodo(addInput, todos, Todo);
  addInput.value = '';
  localStorage.setItem('todosStore', JSON.stringify(todos));
  renderList();
});

addInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addBtn.click();
  }
});

/*  EVENT LISTENERS remove */

todoList.addEventListener('click', (event) => {
  const listItem = event.target;
  const listId = (listItem.id);
  const deleteId = listId.substring(4);
  const test = listId.startsWith('list');
  if (test === true) {
    listItem.remove();
    todos = todos.filter((element) => element.index !== +deleteId);
    localStorage.setItem('todosStore', JSON.stringify(todos));
    renderList();
  }
});

/*  EVENT LISTENERS edit */

todoList.addEventListener('click', (event) => {
  const inputField = event.target;
  const listItem = (event.path[1]);
  const deleteBtn = listItem.childNodes[7];
  const editBtn = listItem.childNodes[5];
  if (inputField.classList.contains('input-task1')) {
    editBtn.classList.add('hidden');
    deleteBtn.classList.remove('hidden');
    inputField.classList.add('textedit');
    inputField.readOnly = false;
    inputField.focus();
    inputField.setSelectionRange(inputField.value.length, inputField.value.length);
  }
});

todoList.addEventListener('keyup', (event) => {
  const editId = event.target.id;
  const inputItem = event.target;
  editTodo(todos, editId, inputItem);
  localStorage.setItem('todosStore', JSON.stringify(todos));
});

todoList.addEventListener('focusout', (event) => {
  const inputField = event.target;
  const listItem = inputField.parentElement;
  if (inputField.classList.contains('input-task1')) {
    const editBtn = listItem.childNodes[5];
    const deleteBtn = listItem.childNodes[7];
    editBtn.classList.remove('hidden');
    deleteBtn.classList.add('hidden');
    inputField.classList.remove('textedit');
    inputField.readOnly = true;
  }
});

/*  EVENT LISTENERS checkbox */
todoList.addEventListener('input', (event) => {
  const checkBox = event.target;
  const checkId = checkBox.id;
  updateTodo(checkBox, todos, checkId);
});

/*  EVENT LISTENERS remove completed */

removeCompleted.addEventListener('click', () => {
  todos = todos.filter((element) => element.completed !== true);
  localStorage.setItem('todosStore', JSON.stringify(todos));
  renderList();
});