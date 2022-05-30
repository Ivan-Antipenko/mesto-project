import {
  cardConstructor,
} from './data';

import {
  changeLikes,
  requestDelete
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

// Открытие попапов изображений
function openPreviewPicture(data) {
  const popupViewer = document.querySelector('.popup-viewer')
  const popupViewerImage = document.querySelector('.popup__image');
  const popupImageDescription = document.querySelector('.popup__image-description')
  popupViewerImage.src = data.link;
  popupViewerImage.alt = data.name;
  popupImageDescription.textContent = data.name;
  openPopup(popupViewer);
};

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
}

// Проверка id для кнопки удаления
function checkId(button, owner, myId) {
  if (owner._id !== myId) {
    button.classList.add('element__delete-icon_type_hidden')
  }
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
    changeLikes(cardElement, likeButton, _id);
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

  setCardEventListener(cardImage, cardDeleteButton, likeButton, { name, link }, _id, cardElement)
  checkId(cardDeleteButton, owner, myId);
  updateLikesView(cardElement, myId, likes)

  return cardElement;
};



export { createCard }