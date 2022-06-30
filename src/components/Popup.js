export default class Popup {
  static selectors = {
    popupCloseButton: ".popup__close-button",
    popupClass: "popup",
    popupOpened: "popup_opened",
  };

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closePopupEscape = this._closePopupEscape.bind(this);
    this._closePopupOverlay = this._closePopupOverlay.bind(this);
  }

  openPopup() {
    this._popup.classList.add(Popup.selectors.popupOpened);
    document.addEventListener("keydown", this._closePopupEscape);
    this._popup.addEventListener("mousedown", this._closePopupOverlay);
  }

  closePopup() {
    this._popup.classList.remove(Popup.selectors.popupOpened);
    document.removeEventListener("keydown", this.__closePopupEscape);
    this._popup.removeEventListener("mousedown", this._closePopupOverlay);
  }

  _closePopupEscape(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  _closePopupOverlay(evt) {
    if (evt.target.classList.contains(Popup.selectors.popupClass)) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(Popup.selectors.popupCloseButton)
      .addEventListener("click", () => this.closePopup());
  }
}
