let localData = JSON.parse(localStorage.getItem("todos"));
let data = localData ? [...localData] : []; // mini data base


const createTodoItem = ({ id, task, deadline, done }) => {
  let li = document.createElement("li");

  // CREATING DELETE BUTTON
  let deleteBtn = document.createElement("img");
  deleteBtn.id = `${id}`; // задаем уникальный id
  deleteBtn.className = "deleteBtn";
  deleteBtn.src = "./images/delete.png";
  deleteBtn.addEventListener("click", onDelete);
  // onDelete 56 строка

  // CHECK BUTTON
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox"; // checkbox -  флажки, нужны для выбора(отметки галочкой)
  // checkbox.checked = true // все задания будут отмечены галочкой 
  checkbox.addEventListener("change", onDone);
  // onDone - 64 строка 
  checkbox.checked = done
  checkbox.setAttribute('Unid', id)

// CREATING TODO LIST
  let txt = document.createTextNode(`${deadline} ${task}`);
  // deadline - дата, см 52 строку, 
  // task - newTask, а newTask = textIn.value, textIn - input для ввода см 51

  // ВНУТРИ LABEL БУДЕТ ХРАНИТСЯ TXT Т.Е TODO LIST СМ 31
  let label = document.createElement("label");
  label.className = done && 'TaskDone'
  // если done true, заработает 'taskDone'
  label.append(txt);
  li.append(label);
  li.append(checkbox);
  li.append(deleteBtn);
  list.append(li);
};

function renderTodos() {
  list.innerHTML = ""; // обнуляем list 
  // если не обнулять, то все прежде написанное в list'e будет повторятся
  data.map((todoItem) => {
    createTodoItem(todoItem);
  });
}

let last_id = localData && localData.length && localData[localData.length - 1].id + 1;
let counter = localData ? last_id : 0;

function onAdd() {
  let newTask = textIn.value;
  if (newTask !== "") {
    textIn.value = ""; // обнуляем textIn
    data.push({
      id: counter++,
      task: newTask,
      deadline: dateInput.value,
      done: false
      // deadline равен dateInput.value, dateInput.value это дата 
    });
    localStorage.setItem("todos", JSON.stringify(data));
    renderTodos();
  } else {
    alert("For create a new todo type smth!");
  }
}

function onDelete(e) {
    e.target.parentElement.remove();
    // удаляет элемент
    let current = Number(e.target.id)
    let filtered = data.filter(el => el.id !== current)
    data = filtered
    localStorage.setItem("todos", JSON.stringify(data))
    renderTodos()
}

function onDone(e) {
  let current = Number(e.target.getAttribute('Unid'))
  // number стоит потому что значение Unid = строке '1' и.т.д
  let modifiedArray = data.map(el => {
    if(el.id === current){
      el.done = !el.done
    }

    return el
  })
  data = modifiedArray
  renderTodos()
  localStorage.setItem('todos', JSON.stringify(data))
}

// set a function
addBtn.addEventListener("click", onAdd);

// if onclick Enter
textIn.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    onAdd();
  }
});
renderTodos();

// КРАТКОЕ ОБЪЯСНЕНИЕ ВСЕГО КОДА
// мы создали времменное хранилище data(localStorage)
// и все что мы пишем на date.input(поле ввода)
// попадает в dat'у, 
// и чтобы отобразить элементы на date.input
// мы итерируем dat'у через map(data.map) в качестве аргумента мы передадим весь объект(toDoItem)
// и вызываем функцию createToDoItem, она выведет на экран те значения которые должны быть
// выведены и которые есть внутри ToDoItem
// 
