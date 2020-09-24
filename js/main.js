'use strict';

// MockData

const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const ROOMS = 5;
const GUESTS = 10;
const PRICE = 10000;
const fishingText = `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit`;

const MAP_MIN_Y = 130;
const MAP_MAX_Y = 630;
const PIN_WIDTH = 62;
const PIN_HEIGHT = 82;
const PINS_QUANTITY = 8;
const mapPins = document.querySelector(`.map__pins`);
const mapMinX = 0;
const mapMaxX = mapPins.clientWidth;

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

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
  const newStr = shuffleArray(temp).splice(0, getRandomInRange(4, temp.length)).join(` `);
  const firstCapitalStr = newStr.replace(newStr[0], newStr[0].toUpperCase());
  if (firstCapitalStr[firstCapitalStr.length - 1] === `,`) {
    return `${firstCapitalStr.slice(0, -1)}.`;
  }
  return `${firstCapitalStr}.`;
};

const createAdvertisingObj = (index) => {
  return {
    "author": {
      "avatar": getUrl(index),
    },
    "offer": {
      "title": createTitle(fishingText),
      "address": `${getRandomInRange(mapMinX, mapMaxX)}, ${getRandomInRange(MAP_MIN_Y, MAP_MAX_Y - PIN_HEIGHT)}`,
      "price": getRandomInRange(0, PRICE),
      "type": getRandomElement(TYPES),
      "rooms": getRandomInRange(0, ROOMS),
      "guests": getRandomInRange(1, GUESTS),
      "checkin": getRandomElement(TIMES),
      "checkout": getRandomElement(TIMES),
      "features": getRandomArray(FEATURES),
      "description": getDescription(fishingText),
      "photos": getRandomArray(PHOTOS),
    },
    "location": {
      "x": getRandomInRange(mapMinX, mapMaxX - PIN_WIDTH),
      "y": getRandomInRange(MAP_MIN_Y, MAP_MAX_Y),
    }
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

const createFragment = (array, callback) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.append(callback(array[i]));
  }
  return fragment;
};

const pinsFragment = createFragment(pinsArray, createPinElement);
mapPins.append(pinsFragment);

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
