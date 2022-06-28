import "../pages/index.css";

import { disableButton, FormValidator } from "./validate";

import { Section } from "./section";

import { deleteCard, Api } from "./api";

// import { openPopup, closePopup } from './modal'
import UserInfo from "./UserInfo";

import { loading, confirmProfileData } from "./utils";

import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";

import { Card, createCard, deleteFromRender, changeLikesStatus } from "./card";

// check it
import { renderCard, renderNewCard } from "./utils";

import {
  buttonEditProfile,
  buttonEditPopupClose,
  buttonAddPlace,
  buttonAddPopupClose,
  buttonImagePopupClose,
  popupEdit,
  popupAdd,
  popupViewer,
  popupFormAddPlace,
  popupFormEditProfile,
  popupFormPlaceNameField,
  popupFormPlaceLinkField,
  popupFormEditProfileFieldName,
  popupFormEditProfileFieldAbout,
  profileName,
  profileAbout,
  addButton,
  avatarButton,
  popupAvatar,
  avatarInput,
  avatarForm,
  profileAvatar,
  avatarSubmitButton,
  profileSubmitButton,
  cardsSection,
  userData,
} from "./data";

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

// // Открытие попапа Edit
// function openEditPopup(popup) {
//   popupFormEditProfileFieldName.value = profileName.textContent;
//   popupFormEditProfileFieldAbout.value = profileAbout.textContent;
//   openPopup(popup);
// }

// // Открытие и закрытие попапа edit
// buttonEditProfile.addEventListener("click", () => {
//   openEditPopup(popupEdit);
// });
// buttonEditPopupClose.addEventListener("click", () => {
//   closePopup(popupEdit);
// });

// Открытие и закрытие остальных попапов
buttonAddPlace.addEventListener("click", () => {
  openPopup(popupAdd);
});
buttonAddPopupClose.addEventListener("click", () => {
  closePopup(popupAdd);
});
buttonImagePopupClose.addEventListener("click", () => {
  closePopup(popupViewer);
});
avatarButton.addEventListener("click", () => {
  openPopup(popupAvatar);
});

// Смена аватарки
function submitProfileAvatar(evt) {
  evt.preventDefault();
  loading(true, avatarSubmitButton);
  api
    .sendAvatarLink(avatarInput.value)
    .then(() => {
      profileAvatar.src = avatarInput.value;
      closePopup(popupAvatar);
      disableButton(avatarSubmitButton);
      evt.target.reset();
      api.getProfileInfo();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      loading(false, avatarSubmitButton);
    });
}

// Сохранение изменений профиля
function submitProfileChanges(evt) {
  evt.preventDefault();
  loading(true, profileSubmitButton);
  api
    .sendProfileInfo(
      popupFormEditProfileFieldName.value,
      popupFormEditProfileFieldAbout.value
    )
    .then(() => {
      profileName.textContent = popupFormEditProfileFieldName.value;
      profileAbout.textContent = popupFormEditProfileFieldAbout.value;
      closePopup(popupEdit);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      loading(false, profileSubmitButton);
    });
}

const cardList = new Section(
  {
    renderItems: (item) => {
      cardList.addItem(createCardClass(item, "#card-constructor"));
    },
  },
  cardsSection
);

let user = null;

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
  });

  const cardElement = element.createCard();
  return cardElement;
}

// Добавление новой карточки
function submitAddPlace(evt) {
  evt.preventDefault();
  loading(true, addButton);
  api
    .sendNewCard(popupFormPlaceNameField.value, popupFormPlaceLinkField.value)
    .then((cardsData) => {
      const cardElement = createCardClass(cardsData, "#card-constructor");
      cardList.addItem(cardElement);
    })
    .then(() => {
      disableButton(addButton);
      closePopup(popupAdd);
      evt.target.reset();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      loading(false, addButton);
    });
}

const userInfo = new UserInfo(userData);
const editPopup = new PopupWithForm(".popup-edit", editFormSubmitHandler);

const editFormSubmitHandler = (data) => {
  editPopup.renderLoading(true);
  api
    .sendProfileInfo(data)
    .then((res) => {
      userData.setUserInfo(res);
    })
    .then(() => {
      editPopup.closePopup();
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => {
      editPopup.renderLoading(false);
    });
};

// const addPopup = new PopupWithForm(popupSelectors.addPopupSelector, addFormSubmitHandler);
// const imagePopup = new PopupWithImage(popupSelectors.imagePopupSelector);

editPopup.setEventListeners();
// addPopup.setEventListeners();
// imagePopup.setEventListeners();
// editAvatarPopup.setEventListeners();

buttonEditProfile.addEventListener("click", function () {
  const userData = userInfo.getUserInfo();
  popupFormEditProfileFieldName.value = userData.name;
  popupFormEditProfileFieldAbout.value = userData.about;
  editPopup.openPopup();
  editFormValidation.setInitialState();
});

Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([userData, cardsData]) => {
    user = userData;
    confirmProfileData(userData);
    cardList.renderItems(cardsData.reverse());
  })
  .catch((err) => console.log(err));

avatarForm.addEventListener("submit", submitProfileAvatar);
popupFormAddPlace.addEventListener("submit", submitAddPlace);
popupFormEditProfile.addEventListener("submit", submitProfileChanges);
