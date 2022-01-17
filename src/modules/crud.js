export function addTodo(addInput, todos, TodoClass) {
  if (addInput.value !== '') {
    const newTodo = new TodoClass(addInput.value, todos);
    todos.push(newTodo);
  } else {
    alert('Canot add emty field');
  }
}

export function editTodo(todos, editId, inputItem) {
  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].index === +editId) {
      todos[i].description = inputItem.value.trim();
    }
  }
}