"use strict";

(() => {
  const OFFER_TYPES = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };
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

  const MAP_MIN_X = 0;
  const MAP_MIN_Y = 130;
  const MAP_MAX_Y = 630;
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const PINS_QUANTITY = 8;
  const MAIN_PIN = {
    width: 65,
    height: 65,
    legHeight: 22,
  };

  window.data = {
    OFFER_TYPES,
    FEATURES,
    PHOTOS,
    TIMES,
    ROOMS,
    GUESTS,
    PRICE,
    fishingText,
    MAP_MIN_X,
    MAP_MIN_Y,
    MAP_MAX_Y,
    PIN_WIDTH,
    PIN_HEIGHT,
    PINS_QUANTITY,
    MAIN_PIN,
  };
})();
