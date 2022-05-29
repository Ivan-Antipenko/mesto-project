import { cardsSection } from './data'


// Выведение карточек на экран
function renderCard(cardElement) {
  cardsSection.append(cardElement);
};

// Выведение новой карточки
function renderNewCard(cardElement) {
  cardsSection.prepend(cardElement);
};


function loading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

export { renderCard, renderNewCard, loading }