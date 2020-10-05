"use strict";
(() => {
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

  const createFragment = (array, callback) => {
    const fragment = document.createDocumentFragment();
    array.forEach((el, i) => {
      const element = callback(el);
      element.dataset.id = i;
      fragment.append(element);
    });
    return fragment;
  };

  const setDisabled = (collection) => {
    collection.forEach((elem) => elem.setAttribute(`disabled`, ``));
  };

  const removeDisabled = (collection) => {
    collection.forEach((elem) => elem.removeAttribute(`disabled`));
  };

  const setCoordinate = (elem, input) => {
    let coords = elem.getBoundingClientRect();
    let x = coords.left + scrollX + coords.width / 2;
    let y = coords.top + scrollY + coords.height / 2;

    input.value = `${x} ${y}`;
  };

  const updateCoordinate = (elem, input, obj) => {
    let coords = elem.getBoundingClientRect();
    let x = coords.left + scrollX + coords.width / 2;
    let y;
    if (obj) {
      y = coords.top + scrollY + coords.height + obj.legHeight;
    }
    y = coords.top + scrollY + coords.height;

    input.value = `${x} ${y}`;
  };

  window.utils = {
    shuffleArray,
    getRandomInRange,
    getRandomElement,
    getRandomArray,
    createTitle,
    getDescription,
    createFragment,
    setDisabled,
    removeDisabled,
    setCoordinate,
    updateCoordinate
  };
})();
