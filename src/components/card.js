import {
  cardConstructor,
} from './data';

import {
  requestDelete,
  setLikesUpdateDelete,
  //setLikesUpdateSend
  handleLike
} from './index'

import { openPopup } from './modal'

// // Проверка лайков
// function isLiked(likes, myId) {
//   if (likes.some((like) => like._id === myId)) {
//     return true
//   } else {
//     return false
//   }
// }


// function checkLikeStatus(cardElement, button, _id) {
//   if (button.classList.contains('element__like_active')) {
//     setLikesUpdateDelete(cardElement, button, _id)
//   } else {
//     setLikesUpdateSend(cardElement, button, _id)
//   }
// }


// function changeLikesStatus(cardElement, button, data) {
//   const likesCounter = cardElement.querySelector('.element__likes-counter')
//   button.classList.toggle('element__like_active')
//   likesCounter.textContent = data.likes.length;
// }


// // Открытие попапов изображений
// function openPreviewPicture(data) {
//   const popupViewer = document.querySelector('.popup-viewer')
//   const popupViewerImage = document.querySelector('.popup__image');
//   const popupImageDescription = document.querySelector('.popup__image-description')
//   popupViewerImage.src = data.link;
//   popupViewerImage.alt = data.name;
//   popupImageDescription.textContent = data.name;
//   openPopup(popupViewer);
// };


// // Изменение лайка в зависимости от наличия айди
// function updateLikesView(cardElement, myId, likes) {
//   const likeButton = cardElement.querySelector('.element__like');
//   const likesCounter = cardElement.querySelector('.element__likes-counter');
//   likesCounter.textContent = likes.length.toString();
//   if (isLiked(likes, myId)) {
//     likeButton.classList.add('element__like_active');
//   } else {
//     likeButton.classList.remove('element__like_active');
//   }
// };


// // Проверка id для кнопки удаления
// function checkId(button, owner, myId) {
//   if (owner._id !== myId) {
//     button.classList.add('element__delete-icon_type_hidden')
//   }
// }


// // Удаление карты из DOM
// function deleteFromRender(cardElement) {
//   cardElement.remove();
//   cardElement = null;
// }

// // Клонирование элемента
// function getTemplate() {
//   return cardConstructor.querySelector('.element').cloneNode(true);
// }

// // Слушатели для карточки
// function setCardEventListener(cardImage, cardDeleteButton, likeButton, { name, link }, _id, cardElement) {
//   cardImage.addEventListener('click', () => {
//     openPreviewPicture({ name, link })
//   })
//   cardDeleteButton.addEventListener('click', () => {
//     requestDelete(_id, cardElement);
//   })
//   likeButton.addEventListener('click', () => {
//     checkLikeStatus(cardElement, likeButton, _id);
//   })
// };


// // Конструктор карточек
// function createCard({ name, link, _id, owner, likes }, myId) {
//   const cardElement = getTemplate();
//   const cardImage = cardElement.querySelector('.element__image');
//   const cardDeleteButton = cardElement.querySelector('.element__delete-icon')
//   const likeButton = cardElement.querySelector('.element__like');
//   cardElement.querySelector('.element__title').textContent = name;
//   cardImage.src = link;
//   cardImage.alt = name;

//   setCardEventListener(cardImage, cardDeleteButton, likeButton, { name, link }, _id, cardElement, myId, likes)
//   checkId(cardDeleteButton, owner, myId);
//   updateLikesView(cardElement, myId, likes)


//   return cardElement;
// };


export class Card {
  constructor(data, userData, { handleLike, handleLikeDelete, requestDelete }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userData._id;


    //this._constructor = cardConstructor;
    this._handleLike = handleLike;
    this._handleLikeDelete = handleLikeDelete;
    this._requestDelete = requestDelete;
  }

  // Проверка id для кнопки удаления
  _checkId() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.classList.add('element__delete-icon_type_hidden')
    }
  };

  // Создание элемента из темплейта
  _getElement() {
    const cardElement = document
      .querySelector('#card-constructor')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };

  // Обновление статуса лайка
  _checkLikeUserSet() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._likeButton.classList.add('element__like_active');
      }
    })
  };

  _getLikesCounter() {
    this._element.querySelector('.element__likes-counter').textContent = this._likes.length;
  };

  like(data) {
    this._likeButton.classList.add('element__like_active');
    this._element.querySelector('.element__likes-counter').textContent = this._getLikesCounter(data);
  };

  deleteLike(data) {
    this._likeButton.classList.remove('element__like_active');
    this._element.querySelector('.element__likes-counter').textContent = this._getLikesCounter(data);
  };

  _setEventListeners() {

    // this._image.addEventListener('click', () => {
    //  this._handleCardClick();
    // })

    this._likeButton.addEventListener('click', () => {
      if (!this._likeButton.classList.contains('element__like_active')) {
        this._handleLike();
      } else {
        this._handleLikeDelete();
      }
    });

    this._deleteButton.addEventListener('click', () => {
      this._requestDelete();
    });

  };

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Конструктор карт
  createCard() {
    this._element = this._getElement();
    this._image = this._element.querySelector('.element__image');
    this._deleteButton = this._element.querySelector('.element__delete-icon');
    this._likeButton = this._element.querySelector('.element__like');
    this._element.querySelector('.element__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;


    this._getLikesCounter();
    this._checkId();
    this._checkLikeUserSet();
    this._setEventListeners()

    //setCardEventListener(cardImage, cardDeleteButton, likeButton, { name, link }, _id, cardElement, myId, likes)


    return this._element;
  };

}


// export { createCard, deleteFromRender, isLiked, changeLikesStatus }