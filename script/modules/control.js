import {getRandomId} from "./calculations.js";
import {initApp} from "../script.js";
import {createRow} from "./createElements.js";
import {renderNumberContacts} from "./render.js";
import {getStorage, setStorage, removeStorage} from "./serviceStorage.js";


const addTaskPage = (task, list) => {
  list.append(createRow(task));
  renderNumberContacts(list);
};

export const formControl = (form, list, userName) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.taskName.value.trim()) {
      const formData = new FormData(e.target);
      const add = Object.fromEntries(formData);

      add.id = getRandomId(userName);
      add.statusTask = 'В процессе';
      setStorage(userName, add);
      addTaskPage(add, list);
      form.querySelector('.btnAddTask').disabled = true;
      form.reset();
    }
  });
};

export const modalFormControl = (modalForm, overlay) => {
  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.userName.value.trim()) {
      const formData = new FormData(e.target);
      const add = Object.fromEntries(formData);

      initApp(add.userName);
      overlay.classList.add('invisible', 'opacity-0');
    }
    modalForm.reset();
  });
};

export const listenChangeInput = (form) => {
  const inputForm = form.querySelector('.form-control');

  inputForm.addEventListener('input', (e) => {
    const target = e.target;
    if (target.value.trim() !== '') {
      form.querySelector('.btnAddTask').disabled = false;
    } else {
      form.querySelector('.btnAddTask').disabled = true;
    }
  });
};

export const listenBtnReset = (form) => {
  const btnReset = form.querySelector('.btnReset');

  btnReset.addEventListener('click', () => {
    form.querySelector('.btnAddTask').disabled = true;
  });
};

const createStatusTask = (idTask, userName) => {
  const arr = getStorage(userName);
  const modifyArr = arr.map(element => {
    if (element.id === idTask) {
      element.statusTask = 'Выполнена';
      element.importanceTask = 'table-success';
    }
    return element;
  });

  localStorage.setItem(userName, JSON.stringify(modifyArr));
};

export const actionsControl = (list, userName) => {
  list.addEventListener('click', (e) => {
    const target = e.target;
    const tdStatus = target.closest('.tasRow')
        .querySelector('.tdStatusTask');
    const tdTask = target.closest('.tasRow')
        .querySelector('.task');
    const tdButtons = target.closest('.tasRow')
        .querySelector('.actionsButtons');
    const erdBtn = tdButtons.querySelector('.btn-warning');

    //          кнопка завершить

    if (target.closest('.btn-success')) {
      createStatusTask(+target.closest('.tasRow').dataset.idtask, userName);
      tdStatus.textContent = 'Выполнена';
      tdTask.classList.add('text-decoration-line-through');
      target.closest('.tasRow').className = 'tasRow';
      target.closest('.tasRow').classList.add('table-success');
      tdTask.setAttribute('contenteditable', 'false');
      erdBtn.disabled = 'true';
    }

    //        кнопка удалить

    if (target.closest('.btn-danger')) {
      if (confirm('Вы точно хотите удалить эту задачу')) {
        target.closest('.tasRow').remove();
        renderNumberContacts(list);
        removeStorage(+target.closest('.tasRow').dataset.idtask, userName);
      }
    }

    //        кнопка редактировать

    if (target.closest('.btn-warning')) {
      tdTask.setAttribute('contenteditable', 'true');
      tdTask.addEventListener('focusout', () => {
        tdTask.setAttribute('contenteditable', 'false');
        const arr = getStorage(userName);
        const modifyArr = arr.map(element => {
          if (element.id === +target.closest('.tasRow').dataset.idtask) {
            element.taskName = tdTask.textContent;
          }
          return element;
        });

        localStorage.setItem(userName, JSON.stringify(modifyArr));
      });
    }
  });
};

