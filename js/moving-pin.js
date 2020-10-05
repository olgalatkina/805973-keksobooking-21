"use strict";
(()=> {
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const pinMain = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const adAddress = adForm.querySelector(`#address`);

  const restrictMovement = (shift) => {
    const frame = {
      top: window.data.MAP_MIN_Y - window.data.MAIN_PIN.height,
      bottom: window.data.MAP_MAX_Y,
      left: window.data.MAP_MIN_X - window.data.MAIN_PIN.width / 2,
      right: mapPins.clientWidth - window.data.MAIN_PIN.width / 2,
    };

    if (pinMain.offsetTop - shift.y < frame.top) {
      pinMain.style.top = `${frame.top}px`;
    }

    if (pinMain.offsetTop - shift.y > frame.bottom) {
      pinMain.style.top = `${frame.bottom}px`;
    }

    if (pinMain.offsetLeft - shift.x < frame.left) {
      pinMain.style.left = `${frame.left}px`;
    }

    if (pinMain.offsetLeft - shift.x > frame.right) {
      pinMain.style.left = `${frame.right}px`;
    }
  };

  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = `${pinMain.offsetTop - shift.y}px`;
      pinMain.style.left = `${pinMain.offsetLeft - shift.x}px`;

      restrictMovement(shift);
      window.utils.updateCoordinate(pinMain, adAddress);
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        window.utils.updateCoordinate(pinMain, adAddress);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
