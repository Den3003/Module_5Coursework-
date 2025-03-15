

export const getStorage = (userName) => (localStorage.getItem(userName) ?
    JSON.parse(localStorage.getItem(userName)) : []);

export const setStorage = (key, obj) => {
  const receivedArray = getStorage(key);
  receivedArray.push(obj);
  localStorage.setItem(key, JSON.stringify(receivedArray));
};

export const removeStorage = (userId, userName) => {
  const modifyArray = getStorage(userName).filter(obj =>
    obj.id !== userId);
  localStorage.setItem(userName, JSON.stringify(modifyArray));
};
