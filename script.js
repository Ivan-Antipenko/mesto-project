const cardConstructor = document.querySelector('#card-constructor').content; // template для карточек
const cardsSection = document.querySelector('.elements'); // Секция в которой лежат карточки
const elements = document.querySelectorAll('.element'); // Массив из элементов
const likeButton = document.querySelector('.element__like'); // Кнопка лайка
const popupEdit = document.querySelector('.popup-edit'); // Попап профиля
const popupAdd = document.querySelector('.popup-add'); // Попап места
const popupViewer = document.querySelector('.popup-viewer'); // Попап изображения
const popupViewerImage = document.querySelector('.popup__image'); // Картинка попапа
const popupImageDescription = document.querySelector('.popup__image-description'); // Подпись картинки попапа
const buttonEditProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const buttonAddPlace = document.querySelector('.profile__add-button') // Кнопка добавления карточки
const buttonEditPopupClose = document.querySelector('.popup-edit__close-button'); // Кнопка закрытия попапа edit
const buttonAddPopupClose = document.querySelector('.popup-add__close-button'); // Кнопка закрытия попапа add
const buttonImagePopupClose = document.querySelector('.popup-image__close-button'); // Кнопка закрытия попапа viewer
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile'); // Форма профиля
const popupFormEditProfileFieldName = document.querySelector('.popup__form-input_field-name'); // Инпут для имени
const popupFormEditProfileFieldAbout = document.querySelector('.popup__form-input_field-about'); // Инпут "О себе"
const popupFormAddPlace = document.querySelector('.popup__form_add-place'); // Форма карточки
const popupFormPlaceNameField = document.querySelector('.popup__form-input_place-name'); // Инпут для названия карточки 
const popupFormPlaceLinkField = document.querySelector('.popup__form-input_place-link'); // Инпут для ссылки на изображение
const profileName = document.querySelector('.profile__name'); // Имя профиля
const profileAbout = document.querySelector('.profile__about'); // "О себе"
//===============================================================

// Конструктор карточек
function creatingCard(cardName, cardLink) {
  const cardElement = cardConstructor.querySelector('.element').cloneNode(true);
  const elementImageContent = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__title').textContent = cardName;
  elementImageContent.src = cardLink;
  elementImageContent.alt = cardLink;

  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active')
  });
  cardElement.querySelector('.element__delete-icon').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__image').addEventListener('click', () => {
    openingPopup(popupViewer);
    popupViewerImage.src = cardElement.querySelector('.element__image').src;
    popupImageDescription.textContent = cardElement.querySelector('.element__title').textContent;
    popupViewerImage.alt = popupImageDescription.textContent;
  });
  return cardElement;
};
//===============================================================

// Функция выведения карточки на экран
function renderCard(cardElement) {
  cardsSection.prepend(cardElement);
};

// Инициализация карточек из массива
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
initialCards.reverse().forEach((card) => {
  renderCard(creatingCard(card.name, card.link));
});
//===============================================================

// Добавление карточек
popupFormAddPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(creatingCard(popupFormPlaceNameField.value, popupFormPlaceLinkField.value));
  popupFormPlaceNameField.value = "";
  popupFormPlaceLinkField.value = "";
});
//===============================================================

// Функции открытия и закрытия попапов
function openingEditPopup(popup) {
  openingPopup(popup);
  popupFormEditProfileFieldName.value = profileName.textContent;
  popupFormEditProfileFieldAbout.value = profileAbout.textContent;
};

function openingPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
//===============================================================

// Открытие и закрытие попапа edit
buttonEditProfile.addEventListener('click', () => {
  openingEditPopup(popupEdit);
});
buttonEditPopupClose.addEventListener('click', () => {
  closePopup(popupEdit);
});
//===============================================================

// Открытие и закрытие остальных попапов
buttonAddPlace.addEventListener('click', () => {
  openingPopup(popupAdd);
});
buttonAddPopupClose.addEventListener('click', () => {
  closePopup(popupAdd);
});
buttonImagePopupClose.addEventListener('click', () => {
  closePopup(popupViewer);
});
//===============================================================

// Сохранение изменений профиля
popupFormEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupFormEditProfileFieldName.value;
  profileAbout.textContent = popupFormEditProfileFieldAbout.value;
  closePopup(popupEdit);
});
//==========================================================