import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { config, initialCards } from "./utils.js";

const buttonEditElement = document.querySelector(".profile__info-edit");
const buttonCloseElement = document.querySelector(".popup__close");
const popupElement = document.querySelector(".popup");
const popupProfileName = document.querySelector(".popup__input_edit_name");
const popupProfileDescription = document.querySelector(
  ".popup__input_edit_description"
);
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoDescription = document.querySelector(
  ".profile__info-description"
);
const popupForm = document.querySelector(".popup__form");
const popupAddCard = document.querySelector("#add-card");
const buttonAddCard = document.querySelector(".profile__add");
const buttonCloseAdd = document.querySelector("#add-close");
const inputCardName = document.querySelector(".popup__input_add_name");
const inputCardLink = document.querySelector(".popup__input_add_link");
const elementsList = document.querySelector(".elements");
const templateElement = document.querySelector(".template__element");
const popupFormNewCard = document.querySelector("#new-card");
const popupOpenImage = document.querySelector("#open-image");
const popupImage = document.querySelector(".popup__link");
const popupImageName = document.querySelector(".popup__name");
const buttonCloseImage = document.querySelector("#image-close");
const popupEdit = document.querySelector("#edit-profile");
const popupFormEditProfile = document.querySelector("#form-edit-profile");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function handleOpenPopupImage(name, link) {
  openPopup(popupOpenImage);
  popupImage.src = link;
  popupImage.alt = name;
  popupImageName.textContent = name;
}

function handleAddCardClick() {
  openPopup(popupAddCard);
}

function handleEditClick() {
  openPopup(popupEdit);
  popupProfileName.value = profileInfoName.textContent;
  popupProfileDescription.value = profileInfoDescription.textContent;
}
function handleFormSubmit(evt) {
  evt.preventDefault();
  handleCloseClick();
  profileInfoName.textContent = popupProfileName.value;
  profileInfoDescription.textContent = popupProfileDescription.value;
}

function createNewCard(data) {
  const card = new Card(data, handleOpenPopupImage, ".template__element");
  const cardElement = card.createCard();

  document.querySelector(".elements").prepend(cardElement);
}

initialCards.forEach((data) => {
  createNewCard(data);
});

function handleAddSubmit(e) {
  e.preventDefault();

  handleCloseAddCardClick();

  const data = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };

  popupFormNewCard.reset();

  createNewCard(data);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function handleCloseClick() {
  closePopup(popupEdit);
}

function handleCloseAddCardClick() {
  closePopup(popupAddCard);
}

function handleCloseImage() {
  closePopup(popupOpenImage);
}

popupAddCard.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupAddCard);
  }
});

popupEdit.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupEdit);
  }
});

popupOpenImage.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupOpenImage);
  }
});

const formEditProfileValidation = new FormValidator(
  config,
  popupFormEditProfile
);
formEditProfileValidation.enableValidation();

const formNewCardValidator = new FormValidator(config, popupFormNewCard);
formNewCardValidator.enableValidation();

buttonEditElement.addEventListener("click", handleEditClick);
buttonCloseElement.addEventListener("click", handleCloseClick);
popupForm.addEventListener("submit", handleFormSubmit);
buttonAddCard.addEventListener("click", handleAddCardClick);
buttonCloseAdd.addEventListener("click", handleCloseAddCardClick);
popupFormNewCard.addEventListener("submit", handleAddSubmit);
buttonCloseImage.addEventListener("click", handleCloseImage);
