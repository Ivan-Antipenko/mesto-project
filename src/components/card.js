import {
  cardConstructor,
  cardsSection,
  popupViewer
} from './data';

import { openPopup } from './utils';

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

// Конструктор карточек
export function creatingCard(cardName, cardLink) {
  const cardElement = cardConstructor.querySelector('.element').cloneNode(true);
  const elementImageContent = cardElement.querySelector('.element__image');
  const popupViewerImage = document.querySelector('.popup__image');
  const popupImageDescription = document.querySelector('.popup__image-description')
  cardElement.querySelector('.element__title').textContent = cardName;
  elementImageContent.src = cardLink;
  elementImageContent.alt = cardLink;

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

// Создание карточек
function addingCard() {
  initialCards.reverse().forEach((card) => {
    renderCard(creatingCard(card.name, card.link));
  });
}

// Выведение карточек на экран
export function renderCard(cardElement) {
  cardsSection.prepend(cardElement);
};

export { addingCard }