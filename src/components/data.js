const cardConstructor = document.querySelector('#card-constructor').content; // template для карточек
const cardsSection = document.querySelector('.elements'); // Секция в которой лежат карточки
const popupEdit = document.querySelector('.popup-edit'); // Попап профиля
const popupAdd = document.querySelector('.popup-add'); // Попап места
const popupViewer = document.querySelector('.popup-viewer'); // Попап изображения
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

export {
  cardConstructor,
  cardsSection,
  buttonEditProfile,
  buttonEditPopupClose,
  buttonAddPlace,
  buttonAddPopupClose,
  buttonImagePopupClose,
  popupEdit,
  popupFormEditProfileFieldName,
  profileName,
  popupFormEditProfileFieldAbout,
  profileAbout,
  popupAdd,
  popupViewer,
  popupFormAddPlace,
  popupFormPlaceLinkField,
  popupFormPlaceNameField,
  popupFormEditProfile
}