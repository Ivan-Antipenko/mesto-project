import { hasInvalidInput } from './validate'

export function disableButton(button) {
  button.disabled = true;
  button.classList.add('popup__form-button_type_disabled');
};

// Переключение кнопки
export function toggleButtonState(inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
}