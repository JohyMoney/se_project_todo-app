class FormValidator {
  constructor(setting, fromEl) {
    this._inputselector = setting.inputSelector;
    this._formselector=setting.formSelector;
    this._submitbuttonselector=setting.submitButtonSelector;
    this._errorClass=setting.errorClass;
    this._inactiveButtonClass=setting.inactiveButtonClass;
    this._inputErrorClass=setting.inputErrorClass;
    this._formEL=fromEl;
  }

enableValidation() {
    const formElement = document.querySelector(this._formselector);
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

  _setEventListeners(formElement, validator) {
    const inputList = Array.from(
   this._formEL.querySelectorAll(this._inputselector),
  );
  const buttonElement = this._formEL.querySelector(this._submitbuttonselector);
  toggleButtonState(inputList, buttonElement, validator);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(this._formEL, inputElement, validator);
      toggleButtonState(inputList, buttonElement, validator);
    });
  });
  }

  enableValidation() {
    const formElement = document.querySelector(this._formSelector);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(formElement, this);
  }
}

export default FormValidator;