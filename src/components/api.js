// Конфиг
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: '6d23207f-ca89-460f-9fce-a2d606110ebd',
    'Content-Type': 'application/json'
  }
}

// Проверка запроса
function checkRequest(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
};

// Отправка на сервер новых данных профиля
function sendProfileInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
}

// Получение данных профиля
function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers,
    })
    .then(checkRequest)
}

// Получение карточек
function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
      method: "GET",
      headers: config.headers,
    })
    .then(checkRequest)
};


// Отправка нового аватара на сервер
function sendAvatarLink(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(checkRequest)
};


// Добавление новой карточки
function sendNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
    .then(checkRequest)
};


// Удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkRequest)
};


// Поставить лайк
function sendLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(checkRequest)
};


// Убрать лайк
function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkRequest)
};

export {
  sendProfileInfo,
  sendNewCard,
  sendAvatarLink,
  getProfileInfo,
  getCards,
  deleteCard,
  sendLike,
  deleteLike,
}