"use strict";
(() => {
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapMaxX = mapPins.clientWidth;

  const getUrl = (num) => {
    if (num < 10) {
      return `img/avatars/user0${num}.png`;
    }
    return `img/avatars/user${num}.png`;
  };

  const createAdvertisingObj = (index) => {
    const coord = {
      x: window.utils.getRandomInRange(window.data.MAP_MIN_X, mapMaxX),
      y: window.utils.getRandomInRange(window.data.MAP_MIN_Y, window.data.MAP_MAX_Y),
    };

    return {
      author: {
        avatar: getUrl(index),
      },
      offer: {
        title: window.utils.createTitle(window.data.fishingText),
        address: `${coord.x}, ${coord.y}`,
        price: window.utils.getRandomInRange(0, window.data.PRICE),
        type: window.utils.getRandomElement(Object.keys(window.data.OFFER_TYPES)),
        rooms: window.utils.getRandomInRange(0, window.data.ROOMS),
        guests: window.utils.getRandomInRange(1, window.data.GUESTS),
        checkin: window.utils.getRandomElement(window.data.TIMES),
        checkout: window.utils.getRandomElement(window.data.TIMES),
        features: window.utils.getRandomArray(window.data.FEATURES),
        description: window.utils.getDescription(window.data.fishingText),
        photos: window.utils.getRandomArray(window.data.PHOTOS),
      },
      location: {
        x: coord.x - window.data.PIN_WIDTH / 2,
        y: coord.y - window.data.PIN_HEIGHT,
      },
    };
  };

  const getPinsArray = (quantity) => {
    let pinsArray = [];

    for (let i = 1; i <= quantity; i++) {
      const offer = createAdvertisingObj(i);
      pinsArray.push(offer);
    }

    return pinsArray;
  };

  const pinsDataArray = getPinsArray(window.data.PINS_QUANTITY);

  window.map = {
    pinsDataArray,
  };
})();
