import '../pages/index.css'

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
  popupFormEditProfile
} from './data';

import {
  openPopup,
  openEditPopup,
  closePopup
} from './utils';

import { addingCard } from './card';

import { enableValidation } from './validate'

import { submitAddPlace, submitProfileChanges } from './modal'

addingCard();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form__input',
  inputElementError: ".error",
  submitBtn: '.popup__form-button',
  submitBtnDisabled: '.popup__form-button_disabled',
});




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

popupFormAddPlace.addEventListener('submit', submitAddPlace);
popupFormEditProfile.addEventListener('submit', submitProfileChanges);