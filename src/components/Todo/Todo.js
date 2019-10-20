import React, { useState } from 'react';
import axios from 'axios';

const Todo = () => {
	const [ todoName, setTodoName ] = useState('');
	const [ todoList, setTodoList ] = useState([]);
	const inputChangeHandler = event => {
		setTodoName(event.target.value);
	};

	const todoAddHandler = () => {
		setTodoList(todoList.concat(todoName));
		axios
			.post('https://legacy-hooks-udemy.firebaseio.com/todos.json', { name: todoName })
			.then(res => console.log(res))
			.catch(err => console.log(err));
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
