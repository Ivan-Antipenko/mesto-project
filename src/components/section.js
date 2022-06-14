export class Section {
  constructor({ renderItems }, containerSelector) {
    this._renderItems = renderItems;
    this._container = containerSelector;
  }

  // Рендер карт
  renderItems(items) {
    items.forEach((item) => {
      this._renderItems(item);
    });
  }

  // Добавление карты
  addItem(element) {
    this._container.prepend(element);
  }
}