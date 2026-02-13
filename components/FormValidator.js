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
    return this.inputList.some((inputEl) => {
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
    const inputList = Array.from(
      this._formEL.querySelectorAll(this._inputselector),
    );
    const buttonElement = this._formEL.querySelector(
      this._submitbuttonselector,
    );
    
  this._toggleButtonState(inputList, buttonElement, validator);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._CheckInputValidity(formElement, inputElement, validator);
        this._toggleButtonState(inputList, buttonElement, validator);
      });
    });
  }


}

export default FormValidator;
