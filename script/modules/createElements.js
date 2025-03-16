import {
  appFormButtons,
  editingTaskButtons,
  modalFormButtons,
} from "./settingButtons.js";
import {modalFormInput} from "./settingInputs.js";

//           заголовок приложения

export const createAppTitle = (userName) => {
  const appTitle = document.createElement('h3');
  appTitle.textContent = `Todo App ${userName}`;

  return appTitle;
};

//           форма

const createFormSelect = () => {
  const appSelect = document.createElement('select');
  appSelect.setAttribute('name', 'importanceTask');
  appSelect.classList.add('border');
  const optionLight = document.createElement('option');
  optionLight.setAttribute('value', 'table-light');
  optionLight.setAttribute('selected', 'true');
  optionLight.textContent = 'Обычная';
  const optionImportant = document.createElement('option');
  optionImportant.setAttribute('value', 'table-warning');
  optionImportant.textContent = 'Важная';
  const optionUrgent = document.createElement('option');
  optionUrgent.setAttribute('value', 'table-danger');
  optionUrgent.textContent = 'Срочная';

  appSelect.append(optionLight, optionImportant, optionUrgent);

  return appSelect;
};

const createFormInput = (obj) => {
  const appInput = document.createElement('input');
  appInput.setAttribute('type', 'text');
  appInput.setAttribute('placeholder', obj.placeholder);
  appInput.setAttribute('name', obj.name);
  appInput.classList.add(obj.classInput, obj.inputMargin);

  return appInput;
};

const createFormLabel = (inputSettings) => {
  const appLabel = document.createElement('label');
  appLabel.classList.add('form-group', 'me-2', 'mb-0', 'd-flex');
  appLabel.append(createFormInput(inputSettings));
  if (inputSettings.name === 'taskName') {
    appLabel.append(createFormSelect());
  }

  return appLabel;
};

const createButtonsGroup = (params) => {
  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');

    button.type = type;
    button.textContent = text;
    button.className = className;

    return button;
  });

  return btns;
};

export const createAppForm = (arrBtns, inputSettings, classForm) => {
  const appForm = document.createElement('form');
  const buttonGroup = createButtonsGroup(arrBtns);

  if (arrBtns === appFormButtons) {
    buttonGroup[0].setAttribute('disabled', 'true');
    appForm.classList.add('mb-3');
  }

  appForm.classList.add(classForm, 'd-flex'
      , 'align-items-center', 'justify-content-center');
  appForm.append(createFormLabel(inputSettings));
  appForm.append(...buttonGroup);

  return appForm;
};

//          таблица

const createWrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('table-wrapper');

  return wrapper;
};

export const createTable = () => {
  const tableWrapper = createWrapper();
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  table.classList.add('table', 'table-hover', 'table-bordered');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  table.append(thead, tbody);
  table.tbody = tbody;
  tableWrapper.append(table);

  return {
    tableWrapper,
    table,
  };
};

//          создание строки

export const createRow = ({id, statusTask, taskName, importanceTask}) => {
  const tr = document.createElement('tr');
  const tdNumberTask = document.createElement('td');
  const tdTextTask = document.createElement('td');
  const tdStatusTask = document.createElement('td');
  const tdButtonsGroup = document.createElement('td');
  const buttonGroup = createButtonsGroup(editingTaskButtons);

  tdButtonsGroup.classList.add('actionsButtons');
  tdButtonsGroup.append(...buttonGroup);
  if (statusTask === 'Выполнена') {
    tdTextTask.classList.add('text-decoration-line-through');
    tdButtonsGroup.querySelector('.btn-warning').disabled = 'true';
  }
  tr.classList.add(importanceTask);

  tr.classList.add('tasRow');
  tr.setAttribute('data-idTask', id);
  tdNumberTask.classList.add('taskNumber');
  tdTextTask.textContent = taskName;
  tdTextTask.classList.add('task');
  tdStatusTask.textContent = statusTask;
  tdStatusTask.classList.add('tdStatusTask');
  tr.append(tdNumberTask, tdTextTask, tdStatusTask, tdButtonsGroup);

  return tr;
};

//          Модальное окно

export const createModal = () => {
  const overlay = document.createElement('div');
  const modalForm = createAppForm(modalFormButtons
      , modalFormInput
      , 'modalForm');

  overlay.insertAdjacentHTML('afterbegin', `
    <h2 class="mb-3">Здравствуйте! Представьтесь пожалуйста</h2>
  `);
  overlay.append(modalForm);

  return {
    overlay,
    modalForm,
  };
};


