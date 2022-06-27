import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  static selectors = {
    popupViewerImage: ".popup__image",
    popupImageDescription: ".popup__image-description",
  };

  constructor(popupSelector) {
    super(popupSelector);

    this._popupViewerImage = this._popup.querySelector(
      PopupWithImage.selectors.popupImage
    );
    this._popupImageDescription = this._popup.querySelector(
      PopupWithImage.selectors.popupImageDescription
    );
  }

  openPopup(data) {
    this._popupImageDescription.textContent = data.name;
    this._popupViewerImage.src = data.link;
    this._popupViewerImage.alt = data.alt;
    super.openPopup();
  }
}
