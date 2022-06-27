import {
  cardConstructor,
} from './data';

import {
  requestDelete,
  setLikesUpdateSend,
  setLikesUpdateDelete
} from './index'

import { openPopup } from './modal'

// Проверка лайков
function isLiked(likes, myId) {
  if (likes.some((like) => like._id === myId)) {
    return true
  } else {
    return false
  }
}


function checkLikeStatus(cardElement, button, _id) {
  if (button.classList.contains('element__like_active')) {
    setLikesUpdateDelete(cardElement, button, _id)
  } else {
    setLikesUpdateSend(cardElement, button, _id)
  }
}


function changeLikesStatus(cardElement, button, data) {
  const likesCounter = cardElement.querySelector('.element__likes-counter')
  button.classList.toggle('element__like_active')
  likesCounter.textContent = data.likes.length;
}


// Открытие попапов изображений - публ класс PopupWithImage
// function openPreviewPicture(data) {
//   const popupViewer = document.querySelector('.popup-viewer')
//   const popupViewerImage = document.querySelector('.popup__image');
//   const popupImageDescription = document.querySelector('.popup__image-description')
//   popupViewerImage.src = data.link;
//   popupViewerImage.alt = data.name;
//   popupImageDescription.textContent = data.name;
//   openPopup(popupViewer);
// };


// Изменение лайка в зависимости от наличия айди
function updateLikesView(cardElement, myId, likes) {
  const likeButton = cardElement.querySelector('.element__like');
  const likesCounter = cardElement.querySelector('.element__likes-counter');
  likesCounter.textContent = likes.length.toString();
  if (isLiked(likes, myId)) {
    likeButton.classList.add('element__like_active');
  } else {
    likeButton.classList.remove('element__like_active');
  }
};


// Проверка id для кнопки удаления
function checkId(button, owner, myId) {
  if (owner._id !== myId) {
    button.classList.add('element__delete-icon_type_hidden')
  }
}


// Удаление карты из DOM
function deleteFromRender(cardElement) {
  cardElement.remove();
  cardElement = null;
}

// Клонирование элемента
function getTemplate() {
  return cardConstructor.querySelector('.element').cloneNode(true);
}

// Слушатели для карточки
function setCardEventListener(cardImage, cardDeleteButton, likeButton, { name, link }, _id, cardElement) {
  cardImage.addEventListener('click', () => {
    openPreviewPicture({ name, link })
  })
  cardDeleteButton.addEventListener('click', () => {
    requestDelete(_id, cardElement);
  })
  likeButton.addEventListener('click', () => {
    checkLikeStatus(cardElement, likeButton, _id);
  })
};


// Конструктор карточек
function createCard({ name, link, _id, owner, likes }, myId) {
  const cardElement = getTemplate();
  const cardImage = cardElement.querySelector('.element__image');
  const cardDeleteButton = cardElement.querySelector('.element__delete-icon')
  const likeButton = cardElement.querySelector('.element__like');
  cardElement.querySelector('.element__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  setCardEventListener(cardImage, cardDeleteButton, likeButton, { name, link }, _id, cardElement, myId, likes)
  checkId(cardDeleteButton, owner, myId);
  updateLikesView(cardElement, myId, likes)


  return cardElement;
};



export { createCard, deleteFromRender, isLiked, changeLikesStatus }