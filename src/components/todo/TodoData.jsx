const TodoData = (props) => {
    // const TodoData = ({ name }) => {

    const { todoList } = props;

    return (
        <div className='todo-data'>
            {todoList.map((todo, i) => {
                return (
                    <div className="todo-item" key={todo.id}>
                        <div> {todo.name}</div>
                        <button>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}

export default TodoData;