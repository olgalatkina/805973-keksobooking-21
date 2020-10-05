"use strict";
(() => {
  const adForm = document.querySelector(`.ad-form`);
  const housingType = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const arrival = adForm.querySelector(`#timein`);
  const departure = adForm.querySelector(`#timeout`);

  const hasTypeSelect = () => {
    const type = housingType.value;
    const newValue = window.data.OFFER_TYPES[type];
    price.min = newValue;
    price.placeholder = newValue;
  };

  // const hasPrice = () => {
  //   console.log(price.value);
  // };

  const changeTimeDeparture = () => {
    arrival.value = departure.value;
  };

  const changeTimeArrival = () => {
    departure.value = arrival.value;
  };

  housingType.addEventListener(`change`, hasTypeSelect);
  // price.addEventListener(`input`, hasPrice);
  arrival.addEventListener(`change`, changeTimeArrival);
  departure.addEventListener(`change`, changeTimeDeparture);

  // window.form = {};
})();
