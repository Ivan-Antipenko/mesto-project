import {
  cardConstructor,
  popupViewer,
} from './data';

import { deleteCard, sendLike, deleteLike } from './api'

import { openPopup } from './modal';


// Изменения лайков
function changeLike(button, _id, counter) {
  if (button.classList.contains('element__like_active')) {
    sendLike(_id)
      .then((data) => {
        counter.textContent = data.likes.length;
      })
  } else if (!button.classList.contains('element__like_active')) {
    deleteLike(_id)
      .then((data) => {
        counter.textContent = data.likes.length;
      })
  }
};

// Функция добавления слушателей
function setCardEventListener(card, counter, _id, popupImage, popupDescription) {
  card.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__like')) {
      evt.target.classList.toggle('element__like_active')
      changeLike(evt.target, _id, counter)
    } else if (evt.target.classList.contains('element__delete-icon')) {
      deleteCard(_id)
        .then(evt.target.closest('.element').remove());
    } else if (evt.target.classList.contains('element__image')) {
      openPopup(popupViewer);
      popupImage.src = card.querySelector('.element__image').src;
      popupDescription.textContent = card.querySelector('.element__title').textContent;
      popupImage.alt = popupDescription.textContent;
    }
  })
};



// Конструктор карточек
function createCard({ name, link, _id, owner, likes }, myId) {
  const cardElement = cardConstructor.querySelector('.element').cloneNode(true);
  const elementImageContent = cardElement.querySelector('.element__image');
  const likesCounter = cardElement.querySelector('.element__likes-counter')
  const cardLikeButton = cardElement.querySelector('.element__like');
  const cardDeleteButton = cardElement.querySelector('.element__delete-icon')
  const popupViewerImage = document.querySelector('.popup__image');
  const popupImageDescription = document.querySelector('.popup__image-description')
  cardElement.querySelector('.element__title').textContent = name;
  elementImageContent.src = link;
  elementImageContent.alt = name;
  likesCounter.textContent = likes.length;


  // Проверка id лайков
  if (likes.some((like) => like._id === myId)) {
    cardLikeButton.classList.add('element__like_active');
  } else {
    cardLikeButton.classList.remove('element__like_active');
  }

  // Проверка id для кнопки удаления
  if (owner._id !== myId) {
    cardDeleteButton.classList.add('element__delete-icon_type_hidden')
  }

  setCardEventListener(cardElement, likesCounter, _id, popupViewerImage, popupImageDescription)

  return cardElement;
};

export { createCard }