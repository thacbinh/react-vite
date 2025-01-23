const TodoData = (props) => {
    // const TodoData = ({ name }) => {

    const { todoList, deleteTodo } = props;

    const handleOnClick = (id) => {
        deleteTodo(id);
    }


    return (
        <div className='todo-data'>
            {todoList.map((todo, i) => {
                return (
                    <div className="todo-item" key={todo.id}>
                        <div> {todo.name}</div>
                        <button style={{ cursor: "pointer" }} onClick={() => handleOnClick(todo.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}

export default TodoData;