import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addtodopopupEL = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addtodopopupEL.querySelector(".Popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  section.addItem(todoElement); 
}

const todoSection = document.querySelector('.todos__list');
console.log('initialTodos:', initialTodos);
const todoCounter = new TodoCounter(initialTodos, '.counter__text');
function handleCheck(isCompleted) {
  todoCounter.updateCompleted(isCompleted);
}

function handleDelete(isCompleted) {
  if (isCompleted) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const addTodopopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const date = inputValues.date;
    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
  },
});
addTodopopup.setEventListeners();


const section = new Section ({
  items: initialTodos,
  renderer: (item) => {
    const element = generateTodo(item);
    section.addItem(element);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

function generateTodo(data) { 
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
}

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  addTodopopup.open();
});
