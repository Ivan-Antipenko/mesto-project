export default class UserInfo {
  constructor() {
    this._name = document.querySelector(".profile__name");
    this._about = document.querySelector(".profile__about");
    this._avatar = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  getUserId() {
    return {
      user: this._element.textContent,
    };
  }
}
