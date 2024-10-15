import './App.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo, setFilter } from './app/slice/todoSlice';

function App() {
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const todos = useSelector((state) => state.todo.todos);
  const filter = useSelector((state) => state.todo.filter);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input.trim()));
      setInput('');
    }else{
      alert('Todo cannot be Empty Title')
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return todo;
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
  });
  const searchedTodos = filteredTodos.filter(todo =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header><h1>Todo App with Redux-Toolkit</h1></header>
      <section>
        <div className="todo-container">
          <div className="input-container">
            <input
              type="text"
              placeholder="Add a new todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleAddTodo}>Add Todo</button>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-container">
            <button onClick={() => dispatch(setFilter('all'))}>All</button>
            <button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
            <button onClick={() => dispatch(setFilter('incomplete'))}>Incomplete</button>
          </div>
          <ul>
            {searchedTodos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <span onClick={() => dispatch(toggleTodo(todo.id))}>
                  {todo.text}
                </span>
                <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default App;
