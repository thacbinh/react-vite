import reactLogo from './assets/react.svg'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import './components/todo/todo.css'


const App = () => {

  const name = 'abc';
  const age = 25;
  const data = {
    address: "Ha Noi",
    country: "Viet Nam"
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew />
      <TodoData
        name={name} age={age} data={data}
      />

      <div className='todo-image'>
        <img src={reactLogo} className='logo' />
      </div>
    </div>
  )
}

export default App
