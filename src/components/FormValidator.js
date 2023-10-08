export default class FormValidator {
  constructor(config, formElement){
    this._formSelector = config.formSelector,
    this._inputSelector = config.inputSelector,
    this._submitButtonSelector = config.submitButtonSelector,
    this._inactiveButtonClass = config.inactiveButtonClass,
    this._inputErrorClass = config.inputErrorClass,
    this._errorClass = config.errorClass,
    this._formElement = formElement,
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButtonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._formsList = Array.from(document.querySelectorAll(this._formSelector));
  }

 _showError(inputElement) {
  const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    if (isInputValid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }
  
  _toggleButton(isActive) {
    if (isActive) {
      this._submitButtonElement.disabled = false;
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    } else {
      this._submitButtonElement.disabled = true;
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
    }
  }
  
  _setEvenetListener() {
       this._toggleButton(this._formElement.checkValidity());
  
    this._inputList.forEach( (inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButton(this._formElement.checkValidity());
        this._checkInputValidity(inputElement);
      });
    });
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._toggleButton(this._formElement.checkValidity());
    });
  }
  
  enableValidation() {
      this._setEvenetListener();
  } 

}