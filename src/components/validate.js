// Переключение кнопки
function toggleButtonState(inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
}

// Отключение кнопки
function disableButton(button) {
  button.disabled = true;
  button.classList.add('popup__form-button_type_disabled');
};

// Показать ошибку
function showError(popup, input, errorMessage, config) {
  const errorElement = popup.querySelector(`#${input.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  input.classList.add(config.invalidInput);
}


// Скрыть ошибку
function hideError(popup, input, config) {
  const errorElement = popup.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  input.classList.remove(config.invalidInput);

}

// Проверка валидности инпута
function isValid(form, input, config) {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, config)
  } else {
    hideError(form, input, config)
  }
}

// Проверека валидности полей
export function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

// Добавление слушателей и валидации на поля формы
function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, config);
      toggleButtonState(inputList, button, config)
    })
  })
}

// Включение валидации
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(form, config);
  })
}

export { enableValidation, disableButton }