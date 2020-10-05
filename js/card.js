"use strict";
(() => {
  const cardTemplate = document
    .querySelector(`#card`)
    .content.querySelector(`.map__card`);

  const createCardElement = (obj) => {
    const card = cardTemplate.cloneNode(true);
    card.querySelector(`.popup__avatar`).src = obj.author.avatar;
    card.querySelector(`.popup__title`).textContent = obj.offer.title;
    card.querySelector(`.popup__text--address`).textContent = obj.offer.address;
    card.querySelector(`.popup__text--price`).textContent = obj.offer.price;
    card.querySelector(`.popup__text--capacity`)
      .textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
    card.querySelector(`.popup__type`).textContent = obj.offer.type;
    card.querySelector(`.popup__text--time`)
      .textContent = `Заезд после ${obj.offer.checkin}, выезд\u00A0до ${obj.offer.checkout}`;

    const features = card.querySelectorAll(`.popup__feature`);

    for (let feature of features) {
      const str = feature.className.match(/--(\w+)/)[1];
      if (!obj.offer.features.includes(str)) {
        feature.classList.add(`hidden`);
      }
    }

    card.querySelector(`.popup__description`).textContent = obj.offer.description;

    if (obj.offer.photos.length > 1) {
      const imgContainer = card.querySelector(`.popup__photos`);
      const img = card.querySelector(`.popup__photo`);

      obj.offer.photos.forEach((photo, i) => {
        if (i === 0) {
          card.querySelector(`.popup__photo`).src = photo;
        } else {
          const newImg = img.cloneNode(true);
          newImg.src = photo;
          imgContainer.append(newImg);
        }
      });
    } else {
      card.querySelector(`.popup__photo`).src = obj.offer.photos[0];
    }

    return card;
  };

  window.card = {
    createCardElement,
  };
})();
