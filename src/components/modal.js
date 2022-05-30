// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  popup.addEventListener('mousedown', closePopupOverlay);
};

// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  document.removeEventListener('mousedown', closePopupOverlay);
};

// Закрытие попапов клавишей 'Escape'
function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  };
};

// Закрытие попапов кликом на оверлей
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened') ||
    evt.target.classList.contains('popup__close-button')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  };
};

export { openPopup, closePopup }