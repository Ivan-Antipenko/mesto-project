// класс валидации формы

export class FormValidator {
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
      this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
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
  _isValid(input) {
      if (!input.validity.valid) {
        this._showError(input, input.validationMessage)
      } else {
        this._hideError(input)
      }
    }
    //Метод показа ошибки
  _showError(input, errorMessage) {
      const errorElement = this._element.querySelector(`#${input.id}-error`);
      errorElement.textContent = errorMessage;
      // errorClass и invalidInput берутся из enableValidation
      errorElement.classList.add(this._config.errorClass);
      input.classList.add(this._config.invalidInput);
    }
    // Метод скрытия ошибки
  _hideError(input) {
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
