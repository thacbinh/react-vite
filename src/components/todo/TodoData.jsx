const TodoData = (props) => {
    // const TodoData = ({ name }) => {

    const { name, age, data } = props;
    // const name = props.name;
    // const age = props.age;
    // const data = props.data;

    return (
        <div className='todo-data'>
            <div> Name: {name} </div>
            <div> Learning React </div>
            <div> Watching Youtube</div>
        </div>
    );
}

export default TodoData;