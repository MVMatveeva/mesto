import Popup from "../components/Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageName = this._popup.querySelector(".popup__name");
    this._popupImage = this._popup.querySelector(".popup__link");
  }
  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageName.textContent = name;
    super.open();
  }
}
