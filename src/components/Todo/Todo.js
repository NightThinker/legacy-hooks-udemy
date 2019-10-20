import React, { useState } from 'react';

const Todo = () => {
	const [ todoName, setTodoName ] = useState('');
	const [ todoList, setTodoList ] = useState([]);
	const inputChangeHandler = event => {
		setTodoName(event.target.value);
	};

	const todoAddHandler = () => {
		setTodoList(todoList.concat(todoName));
	};

	return (
		<React.Fragment>
			<input type='text' placeholder='Todo' value={todoName} onChange={inputChangeHandler} />
			<button type='button' onClick={todoAddHandler}>
				Add
			</button>
			<ul>{todoList.map(item => <li key={item}>{item}</li>)}</ul>
		</React.Fragment>
	);
};

export default Todo;
