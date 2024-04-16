const TODOS_KEY = 'todos';

const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input');
const todolist = document.querySelector('#todo-list');
const todoLenght = document.querySelector('#todo-length');

let todos = [];
let tasks;


function saveTodo(){
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  tasks = todos.filter((todo) => !todo.active );
  todoLenght.innerHTML = ` (${tasks.length})`;
};

function submitTodo(e){
  e.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    inputId: Date.now() - 1,
    active: false,
  };

  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodo();
};

function paintTodo(newTodo){
  const li = document.createElement('li');
  li.id = newTodo.id;
  li.checked = newTodo.active;

  const span = document.createElement('span');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const deleBtn = document.createElement('button');

  span.innerText = newTodo.text;
  checkbox.type = 'checkbox';
  checkbox.id = newTodo.inputId;
  label.htmlFor = newTodo.inputId;
  deleBtn.innerText = '✕'

  checkbox.addEventListener('click', clickActive);
  deleBtn.addEventListener('click', deleteTodo);

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(span);
  li.appendChild(deleBtn);
  todolist.appendChild(li);

  if(newTodo.active){
    checkbox.checked = newTodo.active;
    li.classList.add('active');
  };
};

function clickActive(e){
  const item = e.target.parentElement;
  item.classList.toggle('active');

  const index = todos.findIndex(obj => obj.id == item.id);
  todos[index].active = !todos[index].active;

  saveTodo();
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
  tasks = parsedTodos.filter((task)=>!task.active);
  parsedTodos.forEach(paintTodo);

  todoLenght.innerHTML = ` (${tasks.length})`;
};
