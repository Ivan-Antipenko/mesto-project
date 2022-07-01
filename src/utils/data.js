const cardConstructor = document.querySelector("#card-constructor").content; // template для карточек
const cardsSection = document.querySelector(".elements"); // Секция в которой лежат карточки
const popupEdit = document.querySelector(".popup-edit"); // Попап профиля
const popupAdd = document.querySelector(".popup-add"); // Попап места
const popupViewer = document.querySelector(".popup-viewer"); // Попап изображения
const buttonEditProfile = document.querySelector(".profile__edit-button"); // Кнопка редактирования профиля
const buttonAddPlace = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const buttonEditPopupClose = document.querySelector(
  ".popup-edit__close-button"
); // Кнопка закрытия попапа edit
const buttonAddPopupClose = document.querySelector(".popup-add__close-button"); // Кнопка закрытия попапа add
const buttonImagePopupClose = document.querySelector(
  ".popup-image__close-button"
);
// Форма профиля
const popupFormEditProfileFieldName = document.querySelector(
  ".popup__form-input_field-name"
); // Инпут для имени
const popupFormEditProfileFieldAbout = document.querySelector(
  ".popup__form-input_field-about"
); // Инпут "О себе"
const popupFormPlaceNameField = document.querySelector(
  ".popup__form-input_place-name"
); // Инпут для названия карточки
const popupFormPlaceLinkField = document.querySelector(
  ".popup__form-input_place-link"
); // Инпут для ссылки на изображение
const profileName = document.querySelector(".profile__name"); // Имя профиля
const profileAbout = document.querySelector(".profile__about"); // "О себе"
const profileAvatar = document.querySelector(".profile__avatar"); // Аватар
const avatarButton = document.querySelector(".profile__avatar-button"); // Кнопка аватара
const avatarSubmitButton = document.querySelector(
  ".popup__form-button-change-avatar"
); // Кнопка сабмита аватара
const popupAvatar = document.querySelector(".popup-avatar"); // Попап аватара
const avatarInput = document.querySelector(".popup__form-input_avatar-link"); // Инпут аватара
const addButton = document.querySelector(".popup__form-button_add-place");
const profileSubmitButton = document.querySelector(
  ".popup__form-button-profile-submit"
);

//Настройки валидации форм
const configEnableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_type_disabled",
  invalidInput: "popup__form-input_type_ivalid",
  errorClass: "error_active",
};
const popupEditForm = document.querySelector(".popup__form_edit-profile");
const popupAvatarForm = document.querySelector(".popup__form_change-avatar");
const popupAddForm = document.querySelector(".popup__form_add-place");

export const userData = {
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__about",
  userAvatarSelector: ".profile__avatar",
};

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
  popupFormPlaceLinkField,
  popupFormPlaceNameField,
  addButton,
  profileAvatar,
  avatarButton,
  popupAvatar,
  avatarInput,
  avatarSubmitButton,
  profileSubmitButton,
  configEnableValidation,
  popupEditForm,
  popupAvatarForm,
  popupAddForm,
};
