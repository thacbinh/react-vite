const TodoNew = (props) => {
    const { addNewTodo } = props;
    // addNewTodo("binh");

    const handleOnClick = () => {
        alert("click me")
    }

    const handleOnChange = (name) => {
        console.log(">>> handle on change ", name)
    }

    return (
        <div className='todo-new'>
            <input onChange={(event) => handleOnChange(event.target.value)} type="text" />
            <button onClick={handleOnClick} style={{ cursor: "pointer" }}>Add</button>
        </div>
    );
}

export default TodoNew;