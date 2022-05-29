import { deleteLike, sendLike } from './api'

// Отключение кнопки
function disableButton(button) {
  button.disabled = true;
  button.classList.add('popup__form-button_type_disabled');
};


// Изменения лайков
function changeLike(button, _id) {
  if (button.classList.contains('element__like_active')) {
    sendLike(_id)
      .then((data) => {
        console.log(data)
        likesCounter.textContent = data.likes.length;
      })
  } else if (!button.classList.contains('element__like_active')) {
    deleteLike(_id)
      .then((data) => {
        console.log(data)
        likesCounter.textContent = data.likes.length;
      })
  }
};


export { changeLike, disableButton }