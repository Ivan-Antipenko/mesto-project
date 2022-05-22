// Показать ошибку
function showError(popup, input, errorMessage) {
  const errorElement = popup.querySelector(`#${input.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('error_active');
}


// Скрыть ошибку
function hideError(popup, input) {
  const errorElement = popup.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('error_active');

}

// Проверка валидности инпута
function isValid(form, input) {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage)
  } else {
    hideError(form, input)
  }
}

// Проверека валидности полей
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

// Переключение кнопки
export function toggleButtonState(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add('popup__form-button_type_disabled');
  } else {
    button.disabled = false;
    button.classList.remove('popup__form-button_type_disabled');
  }
}

// Добавление слушателей и валидации на поля формы
function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__form-input'));
  const button = form.querySelector('.popup__form-button');
  toggleButtonState(inputList, button);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputList, button)
    })
  })
}

// Включение валидации
export function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(form);
  })
}