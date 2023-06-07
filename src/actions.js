let nextTodoId = 0;
export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
};
export const edit = id => {
  return {
    type: 'TOGGLE_TODO',
    id 
  }
};
export const delet = (id) => {
  return {
    type: 'DELETE_TODO',
    id
  }
}