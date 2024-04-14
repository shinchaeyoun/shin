// todoForm은 greeting.js에서 선언했음
// const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input');
const todolist = document.querySelector('#todo-list');

let todos = [];

const TODOS_KEY = 'todos';

function saveTodo(){
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));

  console.log(todos);
};

function submitTodo(e){
  e.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    inputId: Date.now() - 1,
  };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodo();

  console.log(newTodoObj.inputId,'newTodoObj.inputId');
};

function paintTodo(newTodo){
  const li = document.createElement('li');
  li.id = newTodo.id;

  const span = document.createElement('span');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const deleBtn = document.createElement('button');

  span.innerText = newTodo.text;
  checkbox.type = 'checkbox';
  checkbox.id = newTodo.inputId;
  label.htmlFor = newTodo.inputId;
  deleBtn.innerText = '✕'

  checkbox.addEventListener('click', lineThrough);
  deleBtn.addEventListener('click', deleteTodo);

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(span);
  li.appendChild(deleBtn);
  todolist.appendChild(li);
};

function lineThrough(e){
  const item = e.target.parentElement;
  item.classList.toggle('line');
};
function deleteTodo(e){
  const deleLi = e.target.parentElement;
  deleLi.remove();
  todos = todos.filter((delItem) => delItem.id !== parseInt(deleLi.id));
  saveTodo();
};

todoForm.addEventListener('submit', submitTodo);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null){
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
};