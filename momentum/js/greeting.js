const loginForm = document.querySelector('#login-form');
const input = loginForm.querySelector('input');
const greeting = document.querySelector('#greeting');
const g_todoForm = document.querySelector('#todo-form');
const g_todoInput = g_todoForm.querySelector('input');
const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';
const savedUsername = localStorage.getItem(USERNAME_KEY);


function loginFn (e) {
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = input.value;
  localStorage.setItem(USERNAME_KEY,username);
  greetingSetting(username);
};

function greetingSetting (username){
  greeting.classList.remove(HIDDEN_CLASSNAME);
  g_todoForm.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `${username}'s TASKS`
  const span = document.createElement('span');
  span.id = 'todo-length'
  span.innerText = ' (0)'
  greeting.appendChild(span);
  g_todoInput.focus();
};

if (savedUsername === null) {
  loginForm.addEventListener('submit', loginFn);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
} else {
  greetingSetting(savedUsername);
};