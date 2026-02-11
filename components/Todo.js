class Todo {
  constructor(data, selector) {
   console.log(data);
   console.log(selector);
   this._data = data;
    this ._templateElement = document.querySelector(selector);
  }
 

  _generateCheckboxEl() {
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    this._todocheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }
  }

  _setEventListeners() 
    {
    this._todocheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todocheckboxEl.addEventListener("change", (e) => {
      this._data.completed = !this._data.completed;
    });
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  
  getView()  
    {this._todoElement = this._templateElement.content
     .querySelector(".todo")
     .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
 
    todoNameEl.textContent = this._data.name;
      const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
    todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      
    })
    }}`;

    
    this._setEventListeners();
    this._generateCheckboxEl();
  
    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.checked = this._data.completed;

    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.checked = this._data.completed;

    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

  export default Todo;

  