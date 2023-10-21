const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const buttonEditElement = document.querySelector(".profile__info-edit");
const popupProfileName = document.querySelector(".popup__input_edit_name");
const popupProfileDescription = document.querySelector(
  ".popup__input_edit_description"
);
const popupFormNewCard = document.querySelector("#new-card");
const popupFormEditProfile = document.querySelector("#form-edit-profile");
const buttonAddCard = document.querySelector(".profile__add");
const buttonEditAvatar = document.querySelector(".profile__avatar-button");
const profileAvatar = document.querySelector(".profile__avatar");
const formEditAvatar = document.querySelector("#change-photo");

export {
  config,
  buttonEditElement,
  popupProfileName,
  popupProfileDescription,
  popupFormNewCard,
  popupFormEditProfile,
  buttonAddCard,
  buttonEditAvatar,
  profileAvatar,
  formEditAvatar,
};
