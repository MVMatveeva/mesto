export class Card {
  constructor(
    data,
    handleOpenPopupImage,
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__photo").alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;

    this._setEventListener();

    return this._element;
  }

  _handleClickDelete() {
    this._element.remove();
  }
  
  _handleClickLike() {
    this._likeButton.classList.toggle("element__like_active");
  }

  _setEventListener() {
    this._likeButton = this._element.querySelector(".element__like"); 

     this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handleClickDelete(this._element);
      });

      this._likeButton.addEventListener("click", () => {
      this._handleClickLike();
    });

    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handleOpenPopupImage(this._name, this._link);
      });
  }
}
