import { renderCard, creatingCard } from './card'

import {
  popupFormPlaceNameField,
  popupFormPlaceLinkField,
  popupAdd,
  profileName,
  popupFormEditProfileFieldName,
  profileAbout,
  popupFormEditProfileFieldAbout,
  popupEdit
} from './data'

import { closePopup } from './utils'

// Добавление карточек
function submitAddPlace(evt) {
  evt.preventDefault();
  renderCard(creatingCard(popupFormPlaceNameField.value, popupFormPlaceLinkField.value));
  popupFormPlaceNameField.value = "";
  popupFormPlaceLinkField.value = "";
  closePopup(popupAdd);
};


// Сохранение изменений профиля
function submitProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = popupFormEditProfileFieldName.value;
  profileAbout.textContent = popupFormEditProfileFieldAbout.value;
  closePopup(popupEdit);
};


export { submitAddPlace, submitProfileChanges }