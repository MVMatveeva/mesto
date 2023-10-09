import Popup from "../components/Popup.js";
export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupInput = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const formValues = {};
    this._popupInput.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
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
}
