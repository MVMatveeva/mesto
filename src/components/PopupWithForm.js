import Popup from "../components/Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupInput = this._popupForm.querySelectorAll(".popup__input");
    this._submitButtonText = this._popupForm.querySelectorAll(".popup__button")
    this._submitText = this._submitButtonText.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._popupInput.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
    input.value = data[input.name];
    });
    }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._popupForm.reset();
  }

  loading(isLoading, message = "Сохранение...") {
    if (isLoading) {
      this._submitButtonText.textContent = message.toString();
    } else {
      this._submitButtonText.textContent = this._submitText;
    }
  }
}
