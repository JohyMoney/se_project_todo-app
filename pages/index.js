import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addtodopopupEL = document.querySelector("addtodopopupEL");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addtodopopupEL.querySelector(".Popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");


const todoCounter = new TodoCounter(initialTodos, ".todos__counter");

function handleCheck(isCompleted) {
  todoCounter.updateCompleted(isCompleted);
}

function handleUncheck() {
  todoCounter.updateCompleted(false);
}

function handleDelete(isCompleted) {
  if (isCompleted) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const addTodopopup = new PopupWithForm({
  popupSelector: "#add-todo-Popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const date = inputValues.date;
    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
  },
});
addTodopopup.setEventListeners();

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    addTodopopup.close();
  }
}
document.addEventListener("keydown", handleEscapeClose);

const todoSection = new section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

class section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.renderItems = function () {
      this._items.forEach((item) => {
        this._renderer(item);
      });
    };
    todoSection.renderItems();
    todosList.append(todoSection._container);
  }
}
todoSection.renderItems();



const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  addTodopopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodopopup.close();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  formValidator.resetValidation();

  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);
  addTodopopup.close();
});
