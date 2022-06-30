import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  static selectors = {
    popupViewerImage: ".popup__image",
    popupImageDescription: ".popup__image-description",
  };

  constructor(popupSelector) {
    super(popupSelector);

    this._popupViewerImage = this._popup.querySelector(
      PopupWithImage.selectors.popupViewerImage
    );
    this._popupImageDescription = this._popup.querySelector(
      PopupWithImage.selectors.popupImageDescription
    );
  }

  openPopup({name, link}) {
    this._popupImageDescription.textContent = name;
    this._popupViewerImage.src = link;
    this._popupViewerImage.alt = name;
    super.openPopup();
  }
}
