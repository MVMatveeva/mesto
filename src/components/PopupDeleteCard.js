import Popup from "../components/Popup.js";

export default class PopupDeleteCard extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupFormDelete = this._popup.querySelector(".popup__form");
    }

    submitDeleteCard(removing){
        this._submitDelete = removing;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupFormDelete.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitDelete();
        })
    }
}