class FormValidator {
  constructor(setting, fromEl) {
    this._inputselector = setting.inputSelector;
    this._formSelector = setting.formSelector;
    this._submitbuttonselector = setting.submitButtonSelector;
    this._errorClass = setting.errorClass;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._formEL = fromEl;
  }

  enableValidation() {
    const formElement = this._formEL;
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(formElement, this);
  }

  _CheckInputValidity(formElement, inputElement, validator) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, validator);
    } else {
      this._hideInputError(formElement, inputElement, validator);
    }
  }
    _showInputError(formElement, inputElement, validator) {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(validator._errorClass);
    }

    _hideInputError(formElement, inputElement, validator) {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.remove(validator._errorClass);
    }
  

  _setEventListeners(formElement, validator) {
    const inputList = Array.from(
      this._formEL.querySelectorAll(this._inputselector),
    );
    const buttonElement = this._formEL.querySelector(
      this._submitbuttonselector,
    );
    toggleButtonState(inputList, buttonElement, validator);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(this._formEL, inputElement, validator);
        toggleButtonState(inputList, buttonElement, validator);
      });
    });
  }


}

export default FormValidator;
