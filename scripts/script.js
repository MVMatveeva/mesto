const buttonEditElement = document.querySelector(".profile__info-edit");
const buttonCloseElement = document.querySelector(".popup__close");
const popupElement = document.querySelector(".popup");
const popupProfileName = document.querySelector(".popup__input_edit_name");
const popupProfileDescription = document.querySelector(".popup__input_edit_description");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoDescription = document.querySelector(  ".profile__info-description");
const popupForm = document.querySelector(".popup__form");
const popupAddCard = document.querySelector("#add-card")
const buttonAddCard = document.querySelector(".profile__add")
const buttonCloseAdd = document.querySelector("#add-close");
const inputCardName = document.querySelector(".popup__input_add_name");
const inputCardLink = document.querySelector (".popup__input_add_link");
const elementsList = document.querySelector(".elements");
const templateElement = document.querySelector(".template__element");
const popupFormNewCard = document.querySelector("#new-card");
const popupOpenImage = document.querySelector("#open-image");
const popupImage = document.querySelector(".popup__link");
const popupImageName = document.querySelector(".popup__name");
const buttonCloseImage = document.querySelector("#image-close");
const popupEdit = document.querySelector("#edit-profile");

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function openPopup(popup){
  popup.classList.add("popup_opened");
}

function closePopup(popup){
  popup.classList.remove("popup_opened");
}

function handleEditClick (){
  openPopup(popupEdit);
  popupProfileName.value = profileInfoName.textContent;
  popupProfileDescription.value = profileInfoDescription.textContent;
}

function handleCloseClick() {
  closePopup(popupEdit);
}


function handleAddCardClick() {
 openPopup(popupAddCard);
}


function handleCloseAddCardClick (){
  closePopup(popupAddCard);
}

function handleCloseImage(){
  closePopup (popupOpenImage);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  handleCloseClick();
  profileInfoName.textContent = popupProfileName.value;
  profileInfoDescription.textContent = popupProfileDescription.value;
}
    


const createCard = ({link, name}) => {
const clone = templateElement.content.cloneNode(true);
const cardElement = clone.querySelector(".element");
const elementPhoto = cardElement.querySelector(".element__photo");
cardElement.querySelector(".element__photo").src = link;
cardElement.querySelector(".element__photo").alt = name;
cardElement.querySelector(".element__text").textContent = name;

document.querySelector("#new-card").reset();

const deleteButtonCard = cardElement.querySelector(".element__trash");
deleteButtonCard.addEventListener("click",()=>{
cardElement.remove();
})

const likeButtonCard = cardElement.querySelector(".element__like");
likeButtonCard.addEventListener("click",()=>{
  likeButtonCard.classList.toggle("element__like_active");
})

function handleOpenImage () {
  openPopup(popupOpenImage);
  
  popupImage.src = link;
  popupImage.alt = name;
  popupImageName.textContent = name;
}

elementPhoto.addEventListener("click", handleOpenImage);

return cardElement
}

initialCards.forEach((item)=>{
  const cardElement = createCard(item);

  elementsList.append(cardElement);
})

const handleAddSubmit = (e) => {
e.preventDefault();

handleCloseAddCardClick();

const link = inputCardLink.value;
const name = inputCardName.value;

const cardElement = createCard({link, name});
elementsList.prepend(cardElement);
}


buttonEditElement.addEventListener("click", handleEditClick);
buttonCloseElement.addEventListener("click", handleCloseClick);
popupForm.addEventListener("submit", handleFormSubmit);
buttonAddCard.addEventListener("click", handleAddCardClick);
buttonCloseAdd.addEventListener("click", handleCloseAddCardClick);
popupFormNewCard.addEventListener("submit", handleAddSubmit);
buttonCloseImage.addEventListener("click", handleCloseImage)