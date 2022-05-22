import {
  popupFormEditProfileFieldName,
  profileName,
  popupFormEditProfileFieldAbout,
  profileAbout
} from './data';

// Открытие попапа Edit
function openEditPopup(popup) {
  openPopup(popup);
  popupFormEditProfileFieldName.value = profileName.textContent;
  popupFormEditProfileFieldAbout.value = profileAbout.textContent;
};

// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  document.addEventListener('click', closePopupOverlay);
};

// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  document.removeEventListener('click', closePopupOverlay);
};

// Закрытие попапов клавишей 'Escape'
function closePopupEscape(evt) {
  let openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup)
  };
};

// Закрытие попвпов кликом на оверлей
function closePopupOverlay(evt) {
  let openedPopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(openedPopup)
  };
};

export {
  openEditPopup,
  openPopup,
  closePopup
}