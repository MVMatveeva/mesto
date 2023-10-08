import "./pages/index.css";
import Card from "../src/components/Card.js";
import FormValidator from "../src/components/FormValidator.js";
import {
  config,
  initialCards,
  buttonEditElement,
  popupProfileName,
  popupProfileDescription,
  popupFormNewCard,
  popupFormEditProfile,
  buttonAddCard,
  inputCardName,
  inputCardLink,
} from "../src/scripts/utils.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import UserInfo from "../src/components/UserInfo.js";
import Section from "../src/components/Section.js";

function createNewCard(data) {
  const card = new Card(data, ".template__element", handleCardClick);

  return card.createCard();
}

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const addCard = createNewCard(item);
      section.addItem(addCard);
    },
  },
  ".elements"
);
section.renderItems();

const formEditProfileValidation = new FormValidator(
  config,
  popupFormEditProfile
);
formEditProfileValidation.enableValidation();

const formNewCardValidator = new FormValidator(config, popupFormNewCard);
formNewCardValidator.enableValidation();

function handleCardClick(name, link) {
  popupViewImage.open(name, link);
}

const popupViewImage = new PopupWithImage("#open-image");
popupViewImage.setEventListeners();

const userInfo = new UserInfo(
  ".profile__info-name",
  ".profile__info-description"
);

function handleEditClick() {
  const { name, description } = userInfo.getUserInfo();

  popupProfileName.value = name;
  popupProfileDescription.value = description;

  popupEditProfie.open();
}

const popupEditProfie = new PopupWithForm({
  popupSelector: "#edit-profile",
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData.name, formData.description);
    popupEditProfie.close();
  },
});
popupEditProfie.setEventListeners();

function openPopupAddCard() {
  popupAddCard.open();
}

const popupAddCard = new PopupWithForm({
  popupSelector: "#add-card",
  handleSubmitForm: (data) => {
    const newCard = {
      name: data[inputCardName.name],
      link: data[inputCardLink.name],
    };
    const addNewCard = createNewCard(newCard);
    section.addItem(addNewCard);
    popupAddCard.close();
  },
});
popupAddCard.setEventListeners();

buttonAddCard.addEventListener("click", openPopupAddCard);

buttonEditElement.addEventListener("click", handleEditClick);
