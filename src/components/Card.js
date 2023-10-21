export default class Card {
  constructor({
    data,
    templateSelector,
    userId,
    handleCardClick,
    handleClickDelete,
    handleClickLike,
    handleDeleteLike,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleClickDelete = handleClickDelete;
    this._handleClickLike = handleClickLike;
    this._handleDeleteLike = handleDeleteLike;
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
    this._photo = this._element.querySelector(".element__photo");
    this._likeButton = this._element.querySelector(".element__like");
    this._trashButton = this._element.querySelector(".element__trash");
    this._element.querySelector(".element__text").textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._name;


    this._sumLikes = this._element.querySelector(".element__like-counter");
    this._sumLikes.textContent = this._likes.length;

    this._changeButtonLikeCard();
    this._deleteButtonDelete();
    this._setEventListener();

    return this._element;
  }

  _setEventListener() {

    this._trashButton.addEventListener("click", () => {
      this._handleClickDelete(this._cardId);
    });

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("element__like_active")) {
        this._handleDeleteLike(this._cardId);
      } else {
        this._handleClickLike(this._cardId);
      }
    });

    this._photo.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  changeSumLikes(data) {
    this._likes = data.likes;
    this._sumLikes.textContent = this._likes.length;
    this._likeButton.classList.toggle("element__like_active");
    return this._likes.length;
  }

  _changeButtonLikeCard() {
        if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeButton.classList.add("element__like_active");
    }
  }

  _deleteButtonDelete() {
    if (this._userId !== this._cardOwnerId) {
      this._trashButton.remove();
    }
  }
    removeCard(){
    this._element.remove();
    this._element = null;
    }
}
