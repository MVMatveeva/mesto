import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
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
} from "../scripts/utils.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-77",
  headers: {
    authorization: "937bea3b-c061-4077-946a-d3848e2def93",
    "Content-type": "application/json"
  },
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, data]) => {
    userId = data._id;
    userInfo.setUserInfo(data);
    section.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

function createNewCard(data) {
  const card = new Card({
    data: data,
    templateSelector: ".template__element",
    userId: userId,
    handleCardClick: (name, link) => {
      popupViewImage.open(name, link);
    },
    handleClickDelete: (cardId) => {
      popupDeleteCard.open();
      popupDeleteCard.submitDeleteCard(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            popupDeleteCard.close();
            card.removeCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleClickLike: (cardId) => {
      api
        .setLikeCard(cardId)
        .then((data) => {
          card.changeSumLikes(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleDeleteLike: (cardId) => {
      api
        .deleteLikeCard(cardId)
        .then((data) => {
          card.changeSumLikes(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });

  return card.createCard();
}

const section = new Section(
  {
    renderer: (item) => {
      const addCard = createNewCard(item);
      section.addItem(addCard);
    },
  },
  ".elements"
);

const formEditProfileValidation = new FormValidator(
  config,
  popupFormEditProfile
);
formEditProfileValidation.enableValidation();

const formNewCardValidator = new FormValidator(config, popupFormNewCard);
formNewCardValidator.enableValidation();

const popupViewImage = new PopupWithImage("#open-image");
popupViewImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  infoSelector: ".profile__info-description",
  avatarSelector: ".profile__avatar",
});

function handleEditClick() {
  const { name, about } = userInfo.getUserInfo();

  popupProfileName.value = name;
  popupProfileDescription.value = about;

  popupEditProfie.open();
}

const popupEditProfie = new PopupWithForm({
  popupSelector: "#edit-profile",
  handleSubmitForm: (formData) => {
    popupEditProfie.loading(true);
    api
      .editUserInfo(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        popupEditProfie.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditProfie.loading(false);
      });
  },
});
popupEditProfie.setEventListeners();

function openPopupAddCard() {
  popupAddCard.open();
}

const popupAddCard = new PopupWithForm({
  popupSelector: "#add-card",
  handleSubmitForm: (data) => {
    popupAddCard.loading(true);
    api.newCard({ name:data.place, link:data.link })
      .then((data) => {
        section.addNewCard(createNewCard(data));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddCard.loading(false);
      });
  },
});
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: "#edit-photo",
  handleSubmitForm: (formData) => {
    popupEditAvatar.loading(true);
    api
      .editAvatar(formData.avatar)
      .then((formData) => {
        profileAvatar.src = formData.avatar;
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditAvatar.loading(false);
      });
  },
});
popupEditAvatar.setEventListeners();

function openPopupEditAvatar() {
  popupEditAvatar.open();
}

const popupEditAvatarValidation = new FormValidator(config, formEditAvatar);
popupEditAvatarValidation.enableValidation();

const popupDeleteCard = new PopupDeleteCard("#delete-card");

popupDeleteCard.setEventListeners();

buttonAddCard.addEventListener("click", openPopupAddCard);

buttonEditElement.addEventListener("click", handleEditClick);

buttonEditAvatar.addEventListener("click", openPopupEditAvatar);
