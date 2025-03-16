import {appContainer} from "./modules/domElements.js";
import {
  formControl,
  listenChangeInput,
  listenBtnReset,
  modalFormControl,
  actionsControl,
} from "./modules/control.js";
import {
  renderToDo,
  renderContacts,
  renderNumberContacts,
  renderModal,
} from "./modules/render.js";
import {getStorage} from "./modules/serviceStorage.js";


export const initApp = (userName) => {
  const {
    table,
    appForm,
  } = renderToDo(appContainer, userName);

  //        Функционал

  renderContacts(table.tbody, getStorage(userName));
  renderNumberContacts(table.tbody);
  formControl(appForm, table.tbody, userName);
  listenBtnReset(appForm);
  listenChangeInput(appForm);
  actionsControl(table.tbody, userName);
};

const initModal = () => {
  const {overlay, modalForm} = renderModal(appContainer);

  //        Функционал

  modalFormControl(modalForm, overlay);
};

initModal();


