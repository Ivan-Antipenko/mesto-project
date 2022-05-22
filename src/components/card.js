import {
  cardConstructor,
  cardsSection,
  popupViewer
} from './data';

import { openPopup } from './modal';


// Конструктор карточек
function createCard(cardName, cardLink) {
  const cardElement = cardConstructor.querySelector('.element').cloneNode(true);
  const elementImageContent = cardElement.querySelector('.element__image');
  const popupViewerImage = document.querySelector('.popup__image');
  const popupImageDescription = document.querySelector('.popup__image-description')
  cardElement.querySelector('.element__title').textContent = cardName;
  elementImageContent.src = cardLink;
  elementImageContent.alt = cardName;

  cardElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__like')) {
      evt.target.classList.toggle('element__like_active');
    } else if (evt.target.classList.contains('element__delete-icon')) {
      evt.target.closest('.element').remove();
    } else if (evt.target.classList.contains('element__image')) {
      openPopup(popupViewer);
      popupViewerImage.src = cardElement.querySelector('.element__image').src;
      popupImageDescription.textContent = cardElement.querySelector('.element__title').textContent;
      popupViewerImage.alt = popupImageDescription.textContent;
    }
  })
  return cardElement;
};


// Выведение карточек на экран
function renderCard(cardElement) {
  cardsSection.prepend(cardElement);
};

export { createCard, renderCard }