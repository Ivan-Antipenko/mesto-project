import '../pages/index.css'

import { openPopup, closePopup } from './modal'

import { renderCard, createCard, renderNewCard } from './card';

import { disableButton } from './utils'

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
  avatarSubmitButton
} from './data';


import { enableValidation } from './validate'

import {
  sendProfileInfo,
  getProfileInfo,
  getCards,
  sendNewCard,
  sendAvatarLink,
  sendLike,
  deleteLike,
} from './api';


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_type_disabled',
  errorClass: 'error_active'
});


// Открытие попапа Edit
function openEditPopup(popup) {
  openPopup(popup);
  popupFormEditProfileFieldName.value = profileName.textContent;
  popupFormEditProfileFieldAbout.value = profileAbout.textContent;
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
  sendAvatarLink(avatarInput.value)
    .then(() => {
      profileAvatar.src = avatarInput.value
      closePopup(popupAvatar);
      disableButton(avatarSubmitButton)
      evt.target.reset();
      getProfileInfo();
    })
};


// Сохранение изменений профиля
function submitProfileChanges(evt) {
  evt.preventDefault();
  sendProfileInfo(popupFormEditProfileFieldName.value, popupFormEditProfileFieldAbout.value)
    .then(() => {
      profileName.textContent = popupFormEditProfileFieldName.value;
      profileAbout.textContent = popupFormEditProfileFieldAbout.value;
      closePopup(popupEdit);
    })
};



// Добавление новой карточки
function submitAddPlace(evt) {
  evt.preventDefault();
  sendNewCard(popupFormPlaceNameField.value, popupFormPlaceLinkField.value)
    .then(getCards())
    .then((res) => {
      renderNewCard(createCard(res))
      disableButton(addButton);
      closePopup(popupAdd);
      evt.target.reset();
    })
}

Promise.all([getProfileInfo(), getCards()])
  .then(([userData, cardsData]) => {
    profileAvatar.src = userData.avatar;
    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    const cardsArray = Array.from(cardsData)
    cardsArray.forEach((card) => {
      renderCard(createCard(card, userData._id, ));
    })
  })
  .catch((err) => console.log(err));

avatarForm.addEventListener('submit', submitProfileAvatar);
popupFormAddPlace.addEventListener('submit', submitAddPlace);
popupFormEditProfile.addEventListener('submit', submitProfileChanges);