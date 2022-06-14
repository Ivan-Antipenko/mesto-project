// Конфиг
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: '6d23207f-ca89-460f-9fce-a2d606110ebd',
    'Content-Type': 'application/json'
  }
}




export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  sendProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          about: about,
        })
      })
      .then(this._checkRequest)
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._checkRequest)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers,
      })
      .then(this._checkRequest)
  };

  sendAvatarLink(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.link
        })
      })
      .then(checkRequest)
  };

  sendNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,

        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(this._checkRequest)
  };

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkRequest)
  };

  sendLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(checkRequest)
  };

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkRequest)
  };
}




// Проверка запроса
function checkRequest(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
};

// Отправка на сервер новых данных профиля
// function sendProfileInfo(name, about) {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       about: about,
//     })
//   })
//   }

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
// function deleteCard(cardId) {
//   return fetch(`${config.baseUrl}/cards/${cardId}`, {
//       method: 'DELETE',
//       headers: config.headers
//     })
//     .then(checkRequest)
// };


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
  sendNewCard,
  sendAvatarLink,
  getProfileInfo,
  getCards,
  sendLike,
  deleteLike,
}