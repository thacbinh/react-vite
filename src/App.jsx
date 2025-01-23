import { useState } from 'react'
import reactLogo from './assets/react.svg'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import './components/todo/todo.css'


const App = () => {

  const [todoList, setTodoList] = useState([
    { id: 1, name: "Learning React" },
    { id: 2, name: "Watching Youtube" }
  ]);

  const name = 'abc';
  const age = 25;
  const data = {
    address: "Ha Noi",
    country: "Viet Nam"
  }

  const addNewTodo = (name) => {
    alert(`call me ${name}`)
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo}
      />
      <TodoData
        name={name} age={age} data={data} todoList={todoList}
      />

      <div className='todo-image'>
        <img src={reactLogo} className='logo' />
      </div>
    </div>
  )
}

export default App
