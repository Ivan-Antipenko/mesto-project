// Инициализация и добавление карточек
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
  const cardsSection = document.querySelector('.elements');
  const cardConstructor = document.querySelector('#card-constructor').content;
  const cardElement = cardConstructor.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  cardsSection.append(cardElement);
});
//===============================================================

// Возможность ставить лайки и удалять уже имеющиейся карточки
function deletingAndLikeFunction() {
  const likeArray = document.querySelectorAll('.element__like');
  likeArray.forEach((like) => {
    like.addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });
  });
  const deleteButtonsArray = document.querySelectorAll('.element__delete-icon');
  deleteButtonsArray.forEach((button) => {
    button.addEventListener('click', () => {
      const deletingCard = button.closest('.element');
      deletingCard.remove();
    });
  });
};
deletingAndLikeFunction()
  //===============================================================

// Открытие и закрытие попапов add, edit и viewer
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  document.querySelector('.popup').classList.add('popup_opened');
  document.querySelector('.popup__form-input_field-name').value = document.querySelector('.profile__name').textContent;
  document.querySelector('.popup__form-input_field-about').value = document.querySelector('.profile__about').textContent;
});
document.querySelector('.popup__close-button').addEventListener('click', () => {
  document.querySelector('.popup').classList.remove('popup_opened');
});
document.querySelector('.profile__add-button').addEventListener('click', () => {
  document.querySelector('.popup-add').classList.add('popup_opened');
});
document.querySelector('.popup-add__close-button').addEventListener('click', () => {
  document.querySelector('.popup-add').classList.remove('popup_opened');
});

function openedPopupViewer() {
  const elements = document.querySelectorAll('.element');
  elements.forEach((element) => {
    element.querySelector('.element__image').addEventListener('click', () => {
      document.querySelector('.popup-viewer').classList.add('popup_opened');
      document.querySelector('.popup__image').src = element.querySelector('.element__image').src;
      document.querySelector('.popup__image-description').textContent = element.querySelector('.element__title').textContent;
    });
  });
  document.querySelector('.popup-image__close-button').addEventListener('click', () => {
    document.querySelector('.popup-viewer').classList.remove('popup_opened');
  });
};
openedPopupViewer();
//===============================================================

// Сохранение изменений профиля
document.querySelector('.popup__form_edit-profile').addEventListener('submit', (evt) => {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = document.querySelector('.popup__form-input_field-name').value;
  document.querySelector('.profile__about').textContent = document.querySelector('.popup__form-input_field-about').value;
  document.querySelector('.popup').classList.remove('popup_opened');
});
//===============================================================

// Добавление карточки места
document.querySelector('.popup__form_add-place').addEventListener('submit', (evt) => {
  evt.preventDefault();
  // (Добавление карточки в изначальный массив)
  initialCards.unshift({ name: document.querySelector('.popup__form-input_place-name').value, link: document.querySelector('.popup__form-input_place-link').value });
  // (Создание элемента на странице исходя из значений инпутов)
  const cardsSection = document.querySelector('.elements');
  const cardConstructor = document.querySelector('#card-constructor').content;
  const cardElement = cardConstructor.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = document.querySelector('.popup__form-input_place-name').value;
  cardElement.querySelector('.element__image').src = document.querySelector('.popup__form-input_place-link').value;
  cardsSection.prepend(cardElement);
  // Добавление рабочих лайков и кнопки удаления к добавленной карточке
  deletingAndLikeFunction()
  document.querySelector('.popup-add').classList.remove('popup_opened');
  openedPopupViewer()
});
//===============================================================