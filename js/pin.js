"use strict";
(() => {
  const pinTemplate = document
    .querySelector(`#pin`)
    .content.querySelector(`.map__pin`);

  const createPinElement = (obj) => {
    const pin = pinTemplate.cloneNode(true);
    pin.style = `left: ${obj.location.x}px; top: ${obj.location.y}px`;
    const img = pin.querySelector(`img`);
    img.src = obj.author.avatar;
    img.alt = obj.offer.title;
    return pin;
  };

  window.pin = {
    createPinElement,
  };
})();
