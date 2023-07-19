const buttonEditElement = document.querySelector(".profile__info-edit");
const buttonCloseElement = document.querySelector(".popup__close");
const popupElement = document.querySelector(".popup");
const popupProfileName = document.querySelector(".popup__input_edit_name");
const popupProfileDescription = document.querySelector(".popup__input_edit_description");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoDescription = document.querySelector(
  ".profile__info-description"
);
const popupForm = document.querySelector(".popup__form");

function handleEditClick() {
  popupElement.classList.add("popup_opened");
  popupProfileName.value = profileInfoName.textContent;
  popupProfileDescription.value = profileInfoDescription.textContent;
}

function handleCloseClick() {
  popupElement.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  handleCloseClick();
  profileInfoName.textContent = popupProfileName.value;
  profileInfoDescription.textContent = popupProfileDescription.value;
}
buttonEditElement.addEventListener("click", handleEditClick);
buttonCloseElement.addEventListener("click", handleCloseClick);
popupForm.addEventListener("submit", handleFormSubmit);


