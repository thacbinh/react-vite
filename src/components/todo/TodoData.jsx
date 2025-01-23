const TodoData = (props) => {
    // const TodoData = ({ name }) => {

    const { todoList } = props;
    // const name = props.name;
    // const age = props.age;
    // const data = props.data;

    return (
        <div className='todo-data'>
            {todoList.map((todo, i) => {
                return (
                    <div className="todo-item">
                        <div> {todo.name}</div>
                        <button>Delete</button>
                    </div>
                )
            })}
            <div>{JSON.stringify(todoList)}</div>
        </div>
    );
}

export default TodoData;