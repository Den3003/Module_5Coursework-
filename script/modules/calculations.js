import {getStorage} from "./serviceStorage.js";

export const getRandomId = (userName) => {
  const randomId = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

  getStorage(userName).forEach(item => {
    if (randomId === item.id) {
      return getRandomId();
    }
  });

  return randomId;
};
