import '../pages/index.css'

import { disableButton } from './validate';

import { deleteCard } from './api';

import { openPopup, closePopup } from './modal'

import { createCard } from './card';

import { renderCard, renderNewCard, loading, confirmProfileData } from './utils'

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
  profileSubmitButton
} from './data';


import { enableValidation } from './validate'

import {
  sendProfileInfo,
  getProfileInfo,
  getCards,
  sendNewCard,
  sendAvatarLink,
  sendLike,
  deleteLike
} from './api';


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_type_disabled',
  invalidInput: 'popup__form-input_type_ivalid',
  errorClass: 'error_active'
});


// Открытие попапа Edit
function openEditPopup(popup) {
  popupFormEditProfileFieldName.value = profileName.textContent;
  popupFormEditProfileFieldAbout.value = profileAbout.textContent;
  openPopup(popup);
};


// Открытие и закрытие попапа edit
buttonEditProfile.addEventListener('click', () => {
  openEditPopup(popupEdit);
});
buttonEditPopupClose.addEventListener('click', () => {
  closePopup(popupEdit);
});


// Открытие и закрытие остальных попапов
buttonAddPlace.addEventListener('click', () => {
  openPopup(popupAdd);
});
buttonAddPopupClose.addEventListener('click', () => {
  closePopup(popupAdd);
});
buttonImagePopupClose.addEventListener('click', () => {
  closePopup(popupViewer);
});
avatarButton.addEventListener('click', () => {
  openPopup(popupAvatar)
})


// Смена аватарки
function submitProfileAvatar(evt) {
  evt.preventDefault();
  loading(true, avatarSubmitButton)
  sendAvatarLink(avatarInput.value)
    .then(() => {
      profileAvatar.src = avatarInput.value
      closePopup(popupAvatar);
      disableButton(avatarSubmitButton)
      evt.target.reset();
      getProfileInfo();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      loading(false, avatarSubmitButton)
    })
};


// Сохранение изменений профиля
function submitProfileChanges(evt) {
  evt.preventDefault();
  loading(true, profileSubmitButton)
  sendProfileInfo(popupFormEditProfileFieldName.value, popupFormEditProfileFieldAbout.value)
    .then(() => {
      profileName.textContent = popupFormEditProfileFieldName.value;
      profileAbout.textContent = popupFormEditProfileFieldAbout.value;
      closePopup(popupEdit);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      loading(false, profileSubmitButton)
    })
};


//
export function setLikesUpdate(_id, likesCounter, button) {
  if (button.classList.contains('element__like_active')) {
    sendLike(_id)
      .then((data) => {
        likesCounter.textContent = data.likes.length;
      })
      .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`));
  } else if (!button.classList.contains('element__like_active')) {
    deleteLike(_id)
      .then((data) => {
        likesCounter.textContent = data.likes.length;
      })
      .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`));
  }
};


// Удаление карточки
export function requestDelete(_id, cardElement) {
  deleteCard(_id)
    .then(() => {
      cardElement.remove();
      cardElement = null;
    })
    .catch(err => console.log(`Ошибка удаления: ${err}`));
}

// Добавление новой карточки
function submitAddPlace(evt) {
  evt.preventDefault();
  loading(true, addButton)
  Promise.all([sendNewCard(popupFormPlaceNameField.value, popupFormPlaceLinkField.value), getProfileInfo()])
    .then(([cardsData, userData]) => {
      renderNewCard(createCard(cardsData, userData._id))
    })
    .then(() => {
      disableButton(addButton);
      closePopup(popupAdd);
      evt.target.reset();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      loading(false, addButton)
    })
}

Promise.all([getProfileInfo(), getCards()])
  .then(([userData, cardsData]) => {
    confirmProfileData(userData)
    const cardsArray = Array.from(cardsData)
    cardsArray.forEach((card) => {
      renderCard(createCard(card, userData._id, ));
    })
  })
  .catch((err) => console.log(err));

avatarForm.addEventListener('submit', submitProfileAvatar);
popupFormAddPlace.addEventListener('submit', submitAddPlace);
popupFormEditProfile.addEventListener('submit', submitProfileChanges);