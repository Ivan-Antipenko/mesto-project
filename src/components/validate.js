// класс валидации формы

export default class FormValidator {
// принимает на вход селектор класса(конфиг) и элемент DOM
  constructor(config, element) {
// переменные приватны, так как используются только внутри конструктора валидации
    this._config = config;
    this._element = element;
// определяем кнопки и инпуты формы
    this._inputList = Array.from(this._element.querySelectorAll(this._config.inputSelector));
    
// значение inputSelector находится в объекте конфигураторе enableValidation
    this._submitButton = this._element.querySelector(this._config.submitButtonSelector);
// значение submitButtonSelector находится в объекте конфигураторе enableValidation
  }
// Добавляем методы валидации
// =======================================================
// Слушатель событий на инпуты
  _setEventListener() {
    this._inputList.forEach((input)=>{
      input.addEventListener('input', ()=>{
        // проверяем валидность
        this._validationHendler(input);
      })
      this._toggleButtonState();
    })
  }
  //Валидность инпутов
  _validationHendler(input) {
    this._isValid(input);
    this._toggleButtonState();
  }
  //Метод отрисовки ошибки в DOM
  _isValid(input){
    if(!input.validity.valid) {
      this._showError(input, input.validationMessage)
    } else {
      this._hideError(input)
    }
  }
  //Метод показа ошибки
  _showError (input, errorMessage) {
    const errorElement = this._element.querySelector(`#${input.id}-error`);
    errorElement.textContent = errorMessage;
    // errorClass и invalidInput берутся из enableValidation
    errorElement.classList.add(this._config.errorClass);
    input.classList.add(this._config.invalidInput);
  }
  // Метод скрытия ошибки
  _hideError (input) {
    const errorElement = this._element.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.invalidInput);
  }
  // Проверка валидности полей
  _hasInvalidInput(inputList) {
      return inputList.some((input) => {
        return !input.validity.valid;
      });
    }
  //Изменение состояния кнопки submit
  _toggleButtonState() {
      if (this._hasInvalidInput(this._inputList)) {
        this._submitButton.disabled = true;
        //Значение inactiveButtonClass берется из enableValidation
        this._submitButton.classList.add(this._config.inactiveButtonClass);
      } else {
        this._submitButton.disabled = false;
        this._submitButton.classList.remove(this._config.inactiveButtonClass);
      }
    }
  //Удаление ошибки при новом открытие окна
  setInitialState() {
    this._inputList.forEach((input) => {
      this._hideError(input);
      this._toggleButtonState();
    });
  }
  //Включение валидации
  enableValidation() {
    this._setEventListener();
  }
}




// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__form-input',
//   submitButtonSelector: '.popup__form-button',
//   inactiveButtonClass: 'popup__form-button_type_disabled',
//   invalidInput: 'popup__form-input_type_ivalid',
//   errorClass: 'error_active'
// });




// // Переключение кнопки
// function toggleButtonState(inputList, button, config) {
//   if (hasInvalidInput(inputList)) {
//     button.disabled = true;
//     button.classList.add(config.inactiveButtonClass);
//   } else {
//     button.disabled = false;
//     button.classList.remove(config.inactiveButtonClass);
//   }
// }

// Отключение кнопки
function disableButton(button) {
  button.disabled = true;
  button.classList.add('popup__form-button_type_disabled');
};

// // Показать ошибку
// function showError(popup, input, errorMessage, config) {
//   const errorElement = popup.querySelector(`#${input.id}-error`);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
//   input.classList.add(config.invalidInput);
// }


// // Скрыть ошибку
// function hideError(popup, input, config) {
//   const errorElement = popup.querySelector(`#${input.id}-error`);
//   errorElement.textContent = '';
//   errorElement.classList.remove(config.errorClass);
//   input.classList.remove(config.invalidInput);

// }

// // Проверка валидности инпута
// function isValid(form, input, config) {
//   if (!input.validity.valid) {
//     showError(form, input, input.validationMessage, config)
//   } else {
//     hideError(form, input, config)
//   }
// }

// // Проверека валидности полей
// export function hasInvalidInput(inputList) {
//   return inputList.some((input) => {
//     return !input.validity.valid;
//   });
// }

// // Добавление слушателей и валидации на поля формы
// function setEventListeners(form, config) {
//   const inputList = Array.from(form.querySelectorAll(config.inputSelector));
//   const button = form.querySelector(config.submitButtonSelector);
//   toggleButtonState(inputList, button, config);
//   inputList.forEach((input) => {
//     input.addEventListener('input', () => {
//       isValid(form, input, config);
//       toggleButtonState(inputList, button, config)
//     })
//   })
// }

// // Включение валидации
// function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((form) => {
//     form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     })
//     setEventListeners(form, config);
//   })
// }

export { disableButton }