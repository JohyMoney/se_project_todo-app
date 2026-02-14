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

  _hasInvalidInput() {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }


 _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  enableValidation() {
    const formElement = this._formEL;
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(formElement, this);
  }

  _CheckInputValidity(formElement, inputEl, validator) {
    if (!inputEl.validity.valid) {
      this._showInputError(formElement, inputEl, validator);
    } else {
      this._hideInputError(formElement, inputEl, validator);
    }
  }
    _showInputError(formElement, inputEl, validator) {
      const errorElement = formElement.querySelector(`.${inputEl.id}-error`);
      errorElement.textContent = inputEl.validationMessage;
      errorElement.classList.add(validator._errorClass);
    }

    _hideInputError(formElement, inputEl, validator) {
      const errorElement = formElement.querySelector(`.${inputEl.id}-error`);
      errorElement.classList.remove(validator._errorClass);
    }
  

_setEventListeners(formElement, validator) {
  this._inputList = Array.from(this._formEL.querySelectorAll(this._inputselector));
  

  this._buttonElement = this._formEL.querySelector(this._submitbuttonselector);
  
  this._toggleButtonState();
  
  this._inputList.forEach(inputEl => {
    inputEl.addEventListener("input", () => {
      this._CheckInputValidity(formElement, inputEl, validator);
      this._toggleButtonState();
    });
  });
}

_enableSubmitButton() {
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.disabled = false;
}
}

export default FormValidator;
