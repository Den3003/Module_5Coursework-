import {
  createAppTitle,
  createAppForm,
  createTable,
  createRow,
  createModal,
} from "./createElements.js";
import {appFormButtons} from "./settingButtons.js";
import {appFormInput} from "./settingInputs.js";

export const renderToDo = (appContainer, userName) => {
  const title = createAppTitle(userName);
  const appForm = createAppForm(appFormButtons, appFormInput, 'appForm');
  const {tableWrapper, table} = createTable();

  appContainer.prepend(title, appForm, tableWrapper);

  return {
    table,
    appForm,
  };
};

export const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.innerHTML = '';
  elem.append(...allRow);

  return allRow;
};

export const renderNumberContacts = (list) => {
  const taskNumbers = list.querySelectorAll('.taskNumber');
  taskNumbers.forEach((element, index) => {
    element.innerHTML = ++index;
  });
};

export const renderModal = (appContainer) => {
  const {overlay, modalForm} = createModal();
  appContainer.append(overlay);

  return {
    overlay,
    modalForm,
  };
};
