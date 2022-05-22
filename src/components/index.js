import '../pages/index.css'

import { openPopup, closePopup } from './modal'

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
  addButton
} from './data';


import { renderCard, createCard } from './card';

import { enableValidation } from './validate'

// Массив с карточками
const initialCards = [{
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


// Создание карточек
function renderInitialCards() {
  initialCards.reverse().forEach((card) => {
    renderCard(createCard(card.name, card.link));
  });
}

renderInitialCards();

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


// Добавление карточек
function submitAddPlace(evt) {
  evt.preventDefault();
  renderCard(createCard(popupFormPlaceNameField.value, popupFormPlaceLinkField.value));
  popupFormPlaceNameField.value = "";
  popupFormPlaceLinkField.value = "";
  disableButton(addButton);
  closePopup(popupAdd);
};

// Сохранение изменений профиля
function submitProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = popupFormEditProfileFieldName.value;
  profileAbout.textContent = popupFormEditProfileFieldAbout.value;
  closePopup(popupEdit);
};


popupFormAddPlace.addEventListener('submit', submitAddPlace);
popupFormEditProfile.addEventListener('submit', submitProfileChanges);