window.onload = () => {
  // Dictionary
  const btnAddTask = document.getElementById('criar-tarefa');
  const oList = document.getElementById('lista-tarefas');
  const btnClearAll = document.getElementById('apaga-tudo');
  const btnClearCompleted = document.getElementById('remover-finalizados');
  const btnSaveTasks = document.getElementById('salvar-tarefas');
  const btnMoveUp = document.getElementById('mover-cima');
  const btnMoveDown = document.getElementById('mover-baixo');
  const btnRemoveSelected = document.getElementById('remover-selecionado');
  const input = document.getElementById('texto-tarefa');

  // Função de Add Task
  const addTask = () => {
    const li = document.createElement('li');
    li.innerHTML = input.value;
    oList.appendChild(li);
  };

  input.addEventListener('keydown', (event) => {
    const trim = input.value.trim();
    if (event.key === 'Enter') {
      if (trim === '') {
        return event.preventDefault()
      }
      addTask();
      input.value = '';
    }
  })
  // Adicionando funcionalidade ao botão para adicionar Task
  btnAddTask.addEventListener('click', (event) => {
    const input = document.getElementById('texto-tarefa');
    const trim = input.value.trim();
    if (trim === '') {
      event.preventDefault();
    } else {
      addTask();
      input.value = '';
    }
  });

  // Colocando background-color ao item selecionado
  document.addEventListener('click', (event) => {
    if (event.target.localName === 'li') {
      const selected = document.querySelector('.selected');
      if ((selected)) {
        selected.classList.remove('selected');
        event.target.classList.add('selected');
      } else {
        event.target.classList.add('selected');
      }
    }
  });

  // Riscando um item quando clicar duas vezes nele
  document.addEventListener('dblclick', (event) => {
    if (event.target.localName === 'li') {
      if (event.target.classList.contains('completed')) {
        event.target.classList.remove('completed');
      } else {
        event.target.classList.add('completed');
      }
    }
  });

  // Função Remove All
  const removeAll = () => {
    const childs = oList.children;
    for (let index = (childs.length - 1); index >= 0; index -= 1) {
      oList.removeChild(childs[index]);
    }
  };

  // Botão que apaga toda Lista
  btnClearAll.addEventListener('click', () => {
    if (oList.children.length !== 0) {
      removeAll();
    }
  });

  // Função removeCompleted
  const removeCompleted = () => {
    const arrayIndexCompleted = [];
    const child = oList.children;
    for (let index = 0; index < child.length; index += 1) {
      if (child[index].classList.contains('completed')) {
        arrayIndexCompleted.push([index]);
      }
    }
    for (let index = arrayIndexCompleted.length - 1; index >= 0; index -= 1) {
      oList.removeChild(oList.children[arrayIndexCompleted[index]]);
    }
  };

  // Botão que apaga Tarefas Finalizadas
  btnClearCompleted.addEventListener('click', () => {
    const completed = document.querySelectorAll('.completed');
    if (completed.length !== 0) {
      removeCompleted();
    }
  });

  // Função que da load em tasks já salvas Não está Dinamico mas vou arrumar

  const loadTasks = () => {
    const arrayTasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(arrayTasks);
    for (let index = 0; index < arrayTasks.length; index += 1) {
      const li = document.createElement('li');
      li.innerHTML = arrayTasks[index].task;
      if (arrayTasks[index].class[0]) {
        console.log('oi');
        const classes = arrayTasks[index].class;
        console.log(classes);
        li.classList.add(arrayTasks[index].class[0]);
        if (Object.keys(classes).length > 1) {
          li.classList.add(classes[1]);
        }
      }
      oList.appendChild(li);
    }
  };

  if (localStorage.getItem('tasks')) {
    loadTasks();
  }

  // Salvando as tarefas com um botão
  btnSaveTasks.addEventListener('click', () => {
    const child = oList.children;
    const arrayTask = [];
    for (let index = 0; index < child.length; index += 1) {
      const obj = {
        task: child[index].innerHTML,
        class: child[index].classList,
      };
      arrayTask.push(obj);
    }
    localStorage.setItem('tasks', JSON.stringify(arrayTask));
  });

  // Função que faz o item mover para baixo
  const moveDown = () => {
    let indexSelected = 0;
    const arrayChild = [];
    const child = oList.children;

    for (let index = 0; index < child.length; index += 1) {
      arrayChild.push(child[index]);
      if (child[index].classList.contains('selected')) {
        indexSelected = index;
      }
    }
    const next = arrayChild[indexSelected + 1].innerHTML;
    console.log(next);
    arrayChild[indexSelected + 1].innerHTML = child[indexSelected].innerHTML;

    child[indexSelected].classList.remove('selected');
    child[indexSelected + 1].classList.add('selected');
    child[indexSelected].innerHTML = next;
  };

  // Função que faz o item mover para cima
  const moveUp = () => {
    let indexSelected = 0;
    // child to array
    const arrayChild = [];
    const child = oList.children;

    for (let index = 0; index < child.length; index += 1) {
      arrayChild.push(child[index]);
      if (child[index].classList.contains('selected')) {
        indexSelected = index;
      }
    }
    const previous = arrayChild[indexSelected - 1].innerHTML;
    arrayChild[indexSelected - 1].innerHTML = child[indexSelected].innerHTML;
    child[indexSelected].classList.remove('selected');
    child[indexSelected - 1].classList.add('selected');
    child[indexSelected].innerHTML = previous;
  };

  // Move Down // Move Up
  btnMoveDown.addEventListener('click', (event) => {
    let indexSelected = 0;
    const arrayChild = [];
    const child = oList.children;
    for (let index = 0; index < child.length; index += 1) {
      arrayChild.push(child[index]);
      if (child[index].classList.contains('selected')) {
        indexSelected = index;
      }
    }
    console.log(indexSelected);
    if (indexSelected === arrayChild.length - 1) {
      event.preventDefault();
    } else {
      moveDown();
    }
  });

  btnMoveUp.addEventListener('click', (event) => {
    let indexSelected = 0;
    const child = oList.children;
    for (let index = 0; index < child.length; index += 1) {
      if (child[index].classList.contains('selected')) {
        indexSelected = index;
      }
    }
    if (indexSelected === 0) {
      event.preventDefault();
    } else {
      moveUp();
    }
  });

  // Função que remove o Selecionado
  const removeSelected = () => {
    const child = oList.children;
    for (let index = 0; index < child.length; index += 1) {
      if (child[index].classList.contains('selected')) {
        oList.removeChild(child[index]);
      }
    }
  };

  // Botão que remove o Selecionado
  btnRemoveSelected.addEventListener('click', removeSelected);
};
