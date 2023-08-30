function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  if (isInputValid) {
    hideError(inputElement, errorElement, config);
  } else {
    showError(inputElement, errorElement, config);
  }
}

function toggleButton(buttonElement, isActive, config) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  }
}

function setEvenetListener(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const submitButtonElement = formElement.querySelector(
    config.submitButtonSelector
  );

  toggleButton(submitButtonElement, formElement.checkValidity(),config);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", () => {
      toggleButton(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config);
    });
  });
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    toggleButton(submitButtonElement, formElement.checkValidity(), config);
  });
}

function enableValidation(config) {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));
  formsList.forEach((formElement) => {
    setEvenetListener(formElement, config);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
