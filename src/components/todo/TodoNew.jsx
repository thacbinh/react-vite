import { useState } from "react";

const TodoNew = (props) => {
    const { addNewTodo } = props;
    // addNewTodo("binh");

    const [inputValue, setInputValue] = useState("");

    const handleOnClick = () => {
        // alert("click me")
        // console.log(">>> check valueInput: ", inputValue)
        addNewTodo(inputValue)
    }

    const handleOnChange = (name) => {
        // console.log(">>> handle on change ", name)
        setInputValue(name);
    }

    return (
        <div className='todo-new'>
            <input onChange={(event) => handleOnChange(event.target.value)} type="text" />
            <button onClick={handleOnClick} style={{ cursor: "pointer" }}>Add</button>
            <div>My Input is: {inputValue}</div>
        </div>
    );
}

export default TodoNew;