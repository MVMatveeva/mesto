const editButtonElement = document.querySelector('.profile__info-edit');
const closeButtonElement = document.querySelector('.popup__close');
const popupElement = document.querySelector('.popup');
const popupProfileName = document.querySelector('.popup__input_name');
const popupProfileDescription = document.querySelector('.popup__input_description');
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoDescription = document.querySelector('.profile__info-description');
const popupSaveButton = document.querySelector('.popup__save');
const popupForm = document.querySelector('.popup__form')
const photoLikes = document.querySelectorAll('.element__like')
const photoLike = document.querySelector('.element__like')

function handleEditClick() {
  popupElement.classList.add('popup_opened');
  popupProfileName.value = profileInfoName.innerText;
  popupProfileDescription.value = profileInfoDescription.innerText;
}
editButtonElement.addEventListener('click', handleEditClick);

function handleCloseClick() {
  popupElement.classList.remove('popup_opened');
}
closeButtonElement.addEventListener('click', handleCloseClick);

function handleFormSubmit(evt) {
  evt.preventDefault();
  popupElement.classList.remove('popup_opened')
  profileInfoName.innerText = popupProfileName.value;
  profileInfoDescription.innerText = popupProfileDescription.value;
}
popupForm.addEventListener('submit', handleFormSubmit)