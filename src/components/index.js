import "../pages/index.css";

import FormValidator from "./Validate";

import Section from "./Section";

import Api from "./Api";

import UserInfo from "./UserInfo";

import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";

import Card from "./Card";

import {
  buttonEditProfile,
  buttonAddPlace,
  popupFormEditProfileFieldName,
  popupFormEditProfileFieldAbout,
  avatarButton,
  cardsSection,
  userData,
} from "./Data";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-10",
  headers: {
    authorization: "6d23207f-ca89-460f-9fce-a2d606110ebd",
    "Content-Type": "application/json",
  },
});

//Настройки валидации форм
const configEnableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_type_disabled",
  invalidInput: "popup__form-input_type_ivalid",
  errorClass: "error_active",
};
const popupEditForm = document.querySelector(".popup__form_edit-profile");
const popupAvatarForm = document.querySelector(".popup__form_change-avatar");
const popupAddForm = document.querySelector(".popup__form_add-place");
const editFormValidation = new FormValidator(
  configEnableValidation,
  popupEditForm
);
const avatarFormValidation = new FormValidator(
  configEnableValidation,
  popupAvatarForm
);
const addFormValidation = new FormValidator(
  configEnableValidation,
  popupAddForm
);
//Включаем валидацию
editFormValidation.enableValidation();
avatarFormValidation.enableValidation();
addFormValidation.enableValidation();
//==================================================================================

let user = null;

const cardList = new Section(
  {
    renderItems: (item) => {
      cardList.addItem(createCardClass(item, "#card-constructor"));
    },
  },
  cardsSection
);

// Cоздание элемента класса Card
function createCardClass(data, cardSelector) {
  const element = new Card(data, cardSelector, {
    userData: user._id,
    handleLikeDelete() {
      api
        .deleteLike(element._id)
        .then((data) => {
          element.deleteLike(data);
        })
        .catch((err) => console.log(`Ошибка статуса лайка: ${err}`));
    },

    requestDelete() {
      api
        .deleteCard(element._id)
        .then(() => {
          element.deleteCard();
        })
        .catch((err) => console.log(`Ошибка удаления: ${err}`));
    },

    handleLike() {
      api
        .sendLike(element._id)
        .then((data) => {
          element.like(data);
        })
        .catch((err) => console.log(`Ошибка статуса лайка: ${err}`));
    },

    handleImageClick() {
      imagePopup.openPopup(data);
    },
  });

  const cardElement = element.createCard();
  return cardElement;
}

const userInfo = new UserInfo(userData);
// Создание объектов классов Popup
const editPopup = new PopupWithForm(".popup-edit", editFormSubmitHandler);
const addPopup = new PopupWithForm(".popup-add", addFormSubmitHandler);
const imagePopup = new PopupWithImage(".popup-viewer");
const avatarPopup = new PopupWithForm(".popup-avatar", changeAvatarHandler);

// Изменение профиля
function editFormSubmitHandler(data) {
  editPopup.renderLoading(true);
  api
    .sendProfileInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() => {
      editPopup.closePopup();
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => {
      editPopup.renderLoading(false);
    });
}

// Добавление карты
function addFormSubmitHandler(data) {
  addPopup.renderLoading(true);
  api
    .sendNewCard(data.name, data.link)
    .then((cardsData) => {
      const cardElement = createCardClass(cardsData, "#card-constructor");
      cardList.addItem(cardElement);
    })
    .then(() => {
      addPopup.disableButton();
      addPopup.closePopup();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      addPopup.renderLoading(false);
    });
}

// Изменение аватара
function changeAvatarHandler(data) {
  avatarPopup.renderLoading(true);
  api
    .sendAvatarLink(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
    })
    .then(() => {   
      avatarPopup.closePopup();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}

buttonAddPlace.addEventListener("click", () => {
  addPopup.openPopup();
  addFormValidation.setInitialState();
});

buttonEditProfile.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  popupFormEditProfileFieldName.value = name;
  popupFormEditProfileFieldAbout.value = about;
  editPopup.openPopup();
  editFormValidation.setInitialState();
});

avatarButton.addEventListener("click", () => {
  avatarPopup.openPopup();
  avatarFormValidation.setInitialState();
});

editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();
avatarPopup.setEventListeners();

Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([userData, cardsData]) => {
    user = userData;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardList.renderItems(cardsData.reverse());
  })
  .catch((err) => console.log(err));
