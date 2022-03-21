const cardConstructor = document.querySelector('#card-constructor').content; // template для карточек
const cardsSection = document.querySelector('.elements'); // Секция в которой лежат карточки
const elements = document.querySelectorAll('.element'); // Массив из элементов
const likeButton = document.querySelector('.element__like'); // Кнопка лайка
const popupEdit = document.querySelector('.popup-edit'); // Попап профиля
const popupAdd = document.querySelector('.popup-add'); // Попап места
const popupViewer = document.querySelector('.popup-viewer'); // Попап изображения
const popupViewerImage = document.querySelector('.popup__image'); // Картинка попапа
const popupImageDescription = document.querySelector('.popup__image-description'); // Подпись картинки попапа
const editProfileButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addPlaceButton = document.querySelector('.profile__add-button') // Кнопка добавления карточки
const editPopupCloseButton = document.querySelector('.popup-edit__close-button'); // Кнопка закрытия попапа edit
const addPopupCloseButton = document.querySelector('.popup-add__close-button'); // Кнопка закрытия попапа add
const imagePopupCloseButton = document.querySelector('.popup-image__close-button'); // Кнопка закрытия попапа viewer
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile'); // Форма профиля
const popupFormEditProfileFieldName = document.querySelector('.popup__form-input_field-name'); // Инпут для имени
const popupFormEditProfileFieldAbout = document.querySelector('.popup__form-input_field-about'); // Инпут "О себе"
const popupFormAddPlace = document.querySelector('.popup__form_add-place'); // Форма карточки
const popupFormPlaceNameField = document.querySelector('.popup__form-input_place-name'); // Инпут для названия карточки 
const popupFormPlaceLinkField = document.querySelector('.popup__form-input_place-link'); // Инпут для ссылки на изображение
const profileName = document.querySelector('.profile__name'); // Имя профиля
const profileAbout = document.querySelector('.profile__about'); // "О себе"
//===============================================================

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
initialCards.forEach((card) => {
  const cardElement = cardConstructor.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.name;
  enableIconsCard(cardElement);
  cardsSection.append(cardElement);
});
//===============================================================

// Функции открытия и закрытия попапов
function openingEditPopup(popup) {
  popup.classList.add('popup_opened');
  // Автозаполнение полей ввода
  popupFormEditProfileFieldName.value = profileName.textContent;
  popupFormEditProfileFieldAbout.value = profileAbout.textContent;
  // Сохранение изменений
  popupFormEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = popupFormEditProfileFieldName.value;
    profileAbout.textContent = popupFormEditProfileFieldAbout.value;
    document.querySelector('.popup').classList.remove('popup_opened');
  });
};

function openingPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
//===============================================================

// Функция добавления интерактива иконкам
function enableIconsCard(cardElement) {
  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active')
  });
  cardElement.querySelector('.element__delete-icon').addEventListener('click', () => {
    const deletingCard = cardElement.querySelector('.element__delete-icon').closest('.element');
    deletingCard.remove();
  });
  cardElement.querySelector('.element__image').addEventListener('click', () => {
    openingPopup(popupViewer);
    popupViewerImage.src = cardElement.querySelector('.element__image').src;
    popupImageDescription.textContent = cardElement.querySelector('.element__title').textContent;
  });
};
//===============================================================

// Добавление карточек
popupFormAddPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardElement = cardConstructor.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = popupFormPlaceNameField.value;
  cardElement.querySelector('.element__image').src = popupFormPlaceLinkField.value;
  cardElement.querySelector('.element__image').alt = popupFormPlaceNameField.value;
  enableIconsCard(cardElement);
  cardsSection.prepend(cardElement);
  popupFormPlaceNameField.value = "";
  popupFormPlaceLinkField.value = "";
});
//===============================================================

// Открытие и закрытие попапа edit
editProfileButton.addEventListener('click', () => {
  openingEditPopup(popupEdit);
});
editPopupCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});
//===============================================================

// Открытие и закрытие попапов
addPlaceButton.addEventListener('click', () => {
  openingPopup(popupAdd);
});
addPopupCloseButton.addEventListener('click', () => {
  closePopup(popupAdd);
});
imagePopupCloseButton.addEventListener('click', () => {
  closePopup(popupViewer);
});
//===============================================================