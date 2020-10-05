"use strict";

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const mapForm = document.querySelector(`.map__filters`);
const mapSelects = mapForm.querySelectorAll(`[id^="housing-"]`);
const pinMain = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFielsets = adForm.querySelectorAll(`fieldset`);
const adAddress = adForm.querySelector(`#address`);

window.utils.setDisabled(adFielsets);
window.utils.setDisabled(mapSelects);
window.utils.setCoordinate(pinMain, adAddress);

// ------------ Activate Page
const activatePage = () => {
  map.classList.remove(`map--faded`);
  const pinsFragment = window.utils.createFragment(
      window.map.pinsDataArray,
      window.pin.createPinElement
  );
  mapPins.append(pinsFragment);
  adForm.classList.remove(`ad-form--disabled`);
  window.utils.removeDisabled(adFielsets);
  window.utils.removeDisabled(mapSelects);
  window.utils.updateCoordinate(
      pinMain,
      adAddress,
      window.data.MAIN_PIN);
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
