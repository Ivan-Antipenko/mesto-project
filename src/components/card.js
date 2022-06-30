export default class Card {
  constructor(data, cardConstructor, { userData, handleLike, handleLikeDelete, requestDelete, handleImageClick }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userData;


    this._constructor = cardConstructor;
    this._handleLike = handleLike;
    this._handleLikeDelete = handleLikeDelete;
    this._requestDelete = requestDelete;
    this._handleImageClick = handleImageClick;
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
      .querySelector(this._constructor)
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
    return this._element.querySelector('.element__likes-counter').textContent = `${data.likes.length}`
  };

  deleteLike(data) {
    this._likeButton.classList.remove('element__like_active');
    return this._element.querySelector('.element__likes-counter').textContent = `${data.likes.length}`

  };

  _setEventListeners() {

    this._image.addEventListener('click', () => {
    this._handleImageClick();
    })

    this._likeButton.addEventListener('click', () => {
      if (!this._likeButton.classList.contains('element__like_active')) {
        this._handleLike();
      } else {
        this._handleLikeDelete();
      }
    });

    this._deleteButton.addEventListener('click', () => {
      this._requestDelete();
      this.deleteCard();
    });

  };

  deleteCard() {
    this._element.remove();
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

    return this._element;
  };
}
