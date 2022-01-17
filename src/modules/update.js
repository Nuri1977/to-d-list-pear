export default function updateTodo(checkBox, todos, checkId) {
  if (checkBox.classList.contains('checkbox')) {
    if (checkBox.checked === true) {
      for (let i = 0; i < todos.length; i += 1) {
        if (todos[i].index === +checkId) {
          todos[i].completed = true;
          localStorage.setItem('todosStore', JSON.stringify(todos));
        }
      }
    } else {
      for (let i = 0; i < todos.length; i += 1) {
        if (todos[i].index === +checkId) {
          todos[i].completed = false;
          localStorage.setItem('todosStore', JSON.stringify(todos));
        }
      }
    }
  }
}
