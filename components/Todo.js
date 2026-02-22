class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _generateCheckboxEl() {
    const todoLabel = this._todoElement.querySelector(".todo__label");
    this._checkboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _setEventListeners() {
    this._deleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._deleteBtn.addEventListener("click", this._handleDelete.bind(this));
    this._checkboxEl = this._todoElement.querySelector(".todo__completed");
    this._checkboxEl.addEventListener("change", this._handleCheck.bind(this));
  }

  _handleDelete() {
    this._todoElement.remove();
  }

  _handleCheck(e) {
    this._data.completed = e.target.checked;
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");

    todoNameEl.textContent = this._data.name;
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners();
    this.generateCheckboxElement();

    todoCheckboxEl.checked = this._data.completed;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    return this._todoElement;
  }

  generateCheckboxElement() {
    this._generateCheckboxEl();
  }
}

export default Todo;
