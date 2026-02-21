import Popup from "./Popup.js";

class PopupWithForm extends Popup {
constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
}

_getInputValues() {
    this_inputList = this._popupForm.querySelectorAll(".popup__input");
    const inputValues = {};
    this_inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = new FormData(this._popupForm);
      const data = {};
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
      this._handleFormSubmit(data);
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
      this._getInputValues().forEach((input) => {
        input.value = "";
      });
    });
  }
}

export default PopupWithForm;
