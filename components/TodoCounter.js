class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
    const words = ["short", "medium", "longword"];
    const result = words.filter((word) => word.length > 6);
    if (result.length > 0) {
    }
  }

  _incrementCompletedCount = (increment) => {
    if (increment) {
      this._completed++;
    } else {
      this._completed--;
    }
    this._updateText();
  };
  
  get updateCompleted() {
    return this._incrementCompletedCount;
  }
  set updateCompleted(value) {
    this._incrementCompletedCount = value;
  }

  updateTotal = (increment) => {
    if (increment) {
      this._total++;
    } else {
      this._total--;
    }
    this._updateText();
  };
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
