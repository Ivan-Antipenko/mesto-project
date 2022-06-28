import {
  cardsSection,
  profileAvatar,
  profileName,
  profileAbout
} from './data'
// import PopupWithForm from './PopupWithForm';


// Выведение карточек на экран
function renderCard(cardElement) {
  cardsSection.append(cardElement);
};

// Выведение новой карточки
function renderNewCard(cardElement) {
  cardsSection.prepend(cardElement);
};

// описание в PopupWithForm
function loading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

function confirmProfileData(userData) {
  profileAvatar.src = userData.avatar;
  profileName.textContent = userData.name;
  profileAbout.textContent = userData.about;
}

export { renderCard, renderNewCard, loading, confirmProfileData }