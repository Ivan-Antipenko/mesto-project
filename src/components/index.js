import '../pages/index.css'

import { disableButton } from './validate';

import { Section } from './section';


import { openPopup, closePopup } from './modal'

import { Card } from './card';
//createCard, deleteFromRender, changeLikesStatus,

import { renderCard, renderNewCard, loading, confirmProfileData } from './utils'

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
  avatarSubmitButton,
  profileSubmitButton,
  cardsSection
} from './data';


import { enableValidation } from './validate'

import {
  // sendProfileInfo,
  getProfileInfo,
  sendAvatarLink,
  sendLike,
  deleteLike,
  Api
} from './api';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: '6d23207f-ca89-460f-9fce-a2d606110ebd',
    'Content-Type': 'application/json'
  }
})
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_type_disabled',
  invalidInput: 'popup__form-input_type_ivalid',
  errorClass: 'error_active'
});


// Открытие попапа Edit
function openEditPopup(popup) {
  popupFormEditProfileFieldName.value = profileName.textContent;
  popupFormEditProfileFieldAbout.value = profileAbout.textContent;
  openPopup(popup);
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
  loading(true, avatarSubmitButton)
  sendAvatarLink(avatarInput.value)
    .then(() => {
      profileAvatar.src = avatarInput.value
      closePopup(popupAvatar);
      disableButton(avatarSubmitButton)
      evt.target.reset();
      getProfileInfo();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      loading(false, avatarSubmitButton)
    })
};


// Сохранение изменений профиля
function submitProfileChanges(evt) {
  evt.preventDefault();
  loading(true, profileSubmitButton)
  api.sendProfileInfo(popupFormEditProfileFieldName.value, popupFormEditProfileFieldAbout.value)
    .then(() => {
      profileName.textContent = popupFormEditProfileFieldName.value;
      profileAbout.textContent = popupFormEditProfileFieldAbout.value;
      closePopup(popupEdit);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      loading(false, profileSubmitButton)
    })
};



// Удаление лайка
export function setLikesUpdateDelete(id, element) {
  api.deleteLike(id)
    .then((data) => {
      element.deleteLike(data)
    })
    .catch(err => console.log(`Ошибка статуса лайка: ${err}`));
}

// Добавление лайка
export function handleLike(id, element) {
  api.sendLike(id)
    .then((data) => {
      console.log(element.like)
    })
    .catch(err => console.log(`Ошибка статуса лайка: ${err}`));
};



// Удаление карточки
export function requestDelete(_id, cardElement) {
  api.deleteCard(_id)
    .then(() => {
      deleteFromRender(cardElement)
    })
    .catch(err => console.log(`Ошибка удаления: ${err}`));
};


const cardList = new Section({
  renderItems: (item) => {
    cardList.addItem(createCardClass(item, '#card-constructor'));
  }
}, cardsSection)



function createCardClass(data, cardSelector) {

  const element = new Card(data, cardSelector, {

    handleLikeDelete() {
      api.deleteLike(element._id)
        .then((data) => {
          element.deletelike(data)
        })
        .catch(err => console.log(`Ошибка статуса лайка: ${err}`));
    },

    requestDelete() {
      api.deleteCard(element._id)
        .then(() => {
          deleteFromRender(cardElement)
        })
        .catch(err => console.log(`Ошибка удаления: ${err}`));
    },

    handleLike() {
      api.sendLike(element._id)
        .then((data) => {
          element.like(data)
        })
        .catch(err => console.log(`Ошибка статуса лайка: ${err}`));
    }
  })

  const cardElement = element.createCard();
  return cardElement;
}


// Добавление новой карточки
function submitAddPlace(evt) {
  evt.preventDefault();
  loading(true, addButton)
  Promise.all([api.sendNewCard(popupFormPlaceNameField.value, popupFormPlaceLinkField.value), api.getProfileInfo()])
    .then(([cardsData, userData]) => {
      const newCard = new Card(cardsData, userData);
      const newElement = newCard.createCard();
      renderNewCard(newElement)
        //renderNewCard(createCard(cardsData, userData._id))
    })
    .then(() => {
      disableButton(addButton);
      closePopup(popupAdd);
      evt.target.reset();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      loading(false, addButton)
    })
}

Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([userData, cardsData]) => {
    confirmProfileData(userData)
    cardList.renderItems(cardsData.reverse());
  })
  .catch((err) => console.log(err));



avatarForm.addEventListener('submit', submitProfileAvatar);
popupFormAddPlace.addEventListener('submit', submitAddPlace);
popupFormEditProfile.addEventListener('submit', submitProfileChanges);