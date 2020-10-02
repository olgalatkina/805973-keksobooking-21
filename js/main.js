"use strict";

const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];
const TIMES = [`12:00`, `13:00`, `14:00`];
const ROOMS = 5;
const GUESTS = 10;
const PRICE = 10000;
const fishingText = `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit`;

const MAP_MIN_Y = 130;
const MAP_MAX_Y = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const PINS_QUANTITY = 8;
const MAIN_PIN = {
  width: 62,
  height: 62,
  legHeight: 22,
};

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
// const filterContainer = map.querySelector(`.map__filters-container`);

const pinTemplate = document
  .querySelector(`#pin`)
  .content.querySelector(`.map__pin`);
// const cardTemplate = document
//   .querySelector(`#card`)
//   .content.querySelector(`.map__card`);

const mapMinX = 0;
const mapMaxX = mapPins.clientWidth;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const getRandomInRange = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomArray = (array) => {
  const copy = [...array];
  return shuffleArray(copy).splice(0, getRandomInRange(1, copy.length));
};

const getUrl = (num) => {
  if (num < 10) {
    return `img/avatars/user0${num}.png`;
  }
  return `img/avatars/user${num}.png`;
};

const createTitle = (str) => {
  const temp = str.replace(/,*\s/g, `,`).split(`,`);
  return getRandomElement(temp).toUpperCase();
};

const getDescription = (str) => {
  const temp = str.split(` `);
  const newStr = shuffleArray(temp)
    .splice(0, getRandomInRange(4, temp.length))
    .join(` `);
  const firstCapitalStr = newStr.replace(newStr[0], newStr[0].toUpperCase());
  if (firstCapitalStr[firstCapitalStr.length - 1] === `,`) {
    return `${firstCapitalStr.slice(0, -1)}.`;
  }
  return `${firstCapitalStr}.`;
};

const createAdvertisingObj = (index) => {
  const coord = {
    x: getRandomInRange(mapMinX, mapMaxX),
    y: getRandomInRange(MAP_MIN_Y, MAP_MAX_Y),
  };

  return {
    author: {
      avatar: getUrl(index),
    },
    offer: {
      title: createTitle(fishingText),
      address: `${coord.x}, ${coord.y}`,
      price: getRandomInRange(0, PRICE),
      type: getRandomElement(TYPES),
      rooms: getRandomInRange(0, ROOMS),
      guests: getRandomInRange(1, GUESTS),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: getRandomArray(FEATURES),
      description: getDescription(fishingText),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: coord.x - PIN_WIDTH / 2,
      y: coord.y - PIN_HEIGHT,
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

const pinsArray = getPinsArray(PINS_QUANTITY);

const createPinElement = (obj) => {
  const pin = pinTemplate.cloneNode(true);
  pin.style = `left: ${obj.location.x}px; top: ${obj.location.y}px`;
  const img = pin.querySelector(`img`);
  img.src = obj.author.avatar;
  img.alt = obj.offer.title;
  return pin;
};

/*
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
*/
const createFragment = (array, callback) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.append(callback(array[i]));
  }
  return fragment;
};

const pinsFragment = createFragment(pinsArray, createPinElement);


const adForm = document.querySelector(`.ad-form`);
const fieldsets = adForm.querySelectorAll(`fieldset`);
const mapForm = document.querySelector(`.map__filters`);
const mapSelects = mapForm.querySelectorAll(`[id^="housing-"]`);
const pinMain = map.querySelector(`.map__pin--main`);
const address = adForm.querySelector(`#address`);

// ------------ Disabled Elements
const addDisabled = (collection) => {
  collection.forEach((elem) => elem.setAttribute(`disabled`, ``));
};

addDisabled(fieldsets);
addDisabled(mapSelects);

// ------------ Set Coordinates
const setCoordinate = (elem, input) => {
  let coords = elem.getBoundingClientRect();
  let x = coords.left + scrollX + coords.width / 2;
  let y = coords.top + scrollY + coords.height / 2;

  input.value = `${x} ${y}`;
};
setCoordinate(pinMain, address);

const updateCoordinate = (elem, input, obj) => {
  let coords = elem.getBoundingClientRect();
  let x = coords.left + scrollX + coords.width / 2;
  let y = coords.top + scrollY + coords.height + obj.legHeight;

  input.value = `${x} ${y}`;
};

// ------------ Activate Page
const removeDisabled = (collection) => {
  collection.forEach((elem) => elem.removeAttribute(`disabled`));
};

const activatePage = () => {
  map.classList.remove(`map--faded`);
  mapPins.append(pinsFragment);
  adForm.classList.remove(`ad-form--disabled`);
  removeDisabled(fieldsets);
  removeDisabled(mapSelects);
  updateCoordinate(pinMain, address, MAIN_PIN);
};

const onPinMainMousedown = (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
  pinMain.removeEventListener(`mousedown`, onPinMainMousedown);
};

const onPinMainKeydown = (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
  pinMain.removeEventListener(`keydown`, onPinMainKeydown);
};

pinMain.addEventListener(`mousedown`, onPinMainMousedown);
pinMain.addEventListener(`keydown`, onPinMainKeydown);

// ------------ Render Cards
// const card = createCardElement(pinsArray[0]);
// map.insertBefore(card, filterContainer);
