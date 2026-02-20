class Popup {
  constructor(PopupSelector) {
    this._PopupElement = document.querySelector(PopupSelector);
    this._PopupCloseBtn = this._PopupElement.querySelector(".Popup__close");
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  open() {
    this._PopupElement.classList.add("Popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._PopupElement.classList.remove("Popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }
  setEventListeners() {
    this._PopupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("Popup_visible") ||
        evt.target.classList.contains("Popup__close")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
