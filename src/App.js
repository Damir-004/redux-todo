import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { addTodo, delet, edit } from './actions';

const mapStateToProps = state => ({ todos: state.todos });
const mapDispatchToProps = dispatch => ({
  addTodo: text => dispatch(addTodo(text)),
  delet: id => dispatch(delet(id)),
  edit: (id, text) => dispatch(edit(id, text)),
});

const App = ({ todos, addTodo, delet, edit}) => {
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false);
  const [item, setItem] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const text = inputRef.current.value.trim();
    if (text === '') {
      setError(true);
      return;
    }
    if (editing) {
      edit(item.id, text);
      setEditing(false);
      setItem(null);
      return;
    }
    addTodo(text);
    inputRef.current.value = '';
    setError(false);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input className='input-1' ref={inputRef} />
        <button className='btn-1' type="submit">Добавить</button>
      </form>
      {error ? <h1 className='er-red'>Текст не может быть пустым</h1> : null}
      {todos.length === 0 ? <p className='pus'>Пусто</p> : null}
      {todos.length > 0 ? (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {editing && item.id === todo.id ? (
                <input
                  value={inputRef.current.value}
                  onChange={e => (inputRef.current.value = e.target.value)}
                  onBlur={() => setEditing(false)}
                  autoFocus
                />
              ) : (
                <div onDoubleClick={() => {
                  setItem(todo);
                  setEditing(true);
                  inputRef.current.value = todo.text;
                }}>{todo.text}</div>
              )}
              <button className='btn-1' onClick={() => delet(todo.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);