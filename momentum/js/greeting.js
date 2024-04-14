const loginForm = document.querySelector('#login-form');
const input = loginForm.querySelector('input');
const greeting = document.querySelector('#greeting');
const todoForm = document.querySelector('#todo-form');
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
  todoForm.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `${username}'s Todo-List`
};

if (savedUsername === null) {
  loginForm.addEventListener('submit', loginFn);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
} else {
  greetingSetting(savedUsername);
};