"use strict";
(() => {
  const map = document.querySelector(`.map`);
  const filterContainer = map.querySelector(`.map__filters-container`);

  let currentCard = null;
  let isPin = false;

  const showCard = (id) => {
    const card = window.card.createCardElement(window.map.pinsDataArray[id]);
    map.insertBefore(card, filterContainer);
    currentCard = card;

    document.addEventListener(`keydown`, onEscPress);
    const closeCardButton = currentCard.querySelector(`.popup__close`);
    closeCardButton.addEventListener(`click`, onCardCloseClick);
  };

  const onPinClick = (evt) => {
    const pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);

    if (!pin || isPin) {
      return;
    }

    isPin = true;
    const id = pin.dataset.id;
    showCard(id);
  };

  const removeCard = () => {
    currentCard.remove();
    currentCard = null;
    isPin = false;
  };

  const onEscPress = (evt) => {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      removeCard();
    }
    document.removeEventListener(`keydown`, onEscPress);
  };

  const onCardCloseClick = () => {
    removeCard();
  };

  map.addEventListener(`click`, onPinClick);
})();
