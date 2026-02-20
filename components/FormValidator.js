class FormValidator {
  constructor(setting, _formEl) {
    this._inputSelector = setting.inputSelector;
    this._formSelector = setting.formSelector;
    this._submitbuttonSelector = setting.submitButtonSelector;
    this._errorClass = setting.errorClass;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._formEL = _formEl;
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
    this._formEL.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

 _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }
  _showInputError(inputEl) {
    const errorElement = this._formEL.querySelector(`#${inputEl.id}-error`);  
    errorElement.textContent = inputEl.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

   _hideInputError(inputEl) {
    const errorElement = this._formEL.querySelector(`#${inputEl.id}-error`);  
    errorElement.textContent = "";  
    errorElement.classList.remove(this._errorClass);
  }
  

_setEventListeners() {
    this._inputList = Array.from(
      this._formEL.querySelectorAll(this._inputselector)
    );

    this._buttonElement = this._formEL.querySelector(
      this._submitbuttonselector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }
    resetValidation() {
    this._formEL.reset(); 
    this._disableSubmitButton(); 
  }
_enableSubmitButton() {
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.disabled = false;
}
}

export default FormValidator;
