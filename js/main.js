"use strict";

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const mapForm = document.querySelector(`.map__filters`);
const mapSelects = mapForm.querySelectorAll(`[id^="housing-"]`);
const pinMain = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFielsets = adForm.querySelectorAll(`fieldset`);
const adAddress = adForm.querySelector(`#address`);

// ------------ Disabled Elements
const setDisabled = (collection) => {
  collection.forEach((elem) => elem.setAttribute(`disabled`, ``));
};

setDisabled(adFielsets);
setDisabled(mapSelects);

// ------------ Set Coordinates
const setCoordinate = (elem, input) => {
  let coords = elem.getBoundingClientRect();
  let x = coords.left + scrollX + coords.width / 2;
  let y = coords.top + scrollY + coords.height / 2;

  input.value = `${x} ${y}`;
};
setCoordinate(pinMain, adAddress);

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
  const pinsFragment = window.utils.createFragment(window.map.pinsDataArray, window.pin.createPinElement);
  mapPins.append(pinsFragment);
  adForm.classList.remove(`ad-form--disabled`);
  removeDisabled(adFielsets);
  removeDisabled(mapSelects);
  updateCoordinate(pinMain, adAddress, window.data.MAIN_PIN);
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
