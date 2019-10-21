import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
	const [ todoName, setTodoName ] = useState('');
	const [ todoList, setTodoList ] = useState([]);

	useEffect(() => {
		axios
			.get('https://legacy-hooks-udemy.firebaseio.com/todos.json')
			.then(result => {
				console.log(result);
				const todoData = result.data;
				const todos = [];
				for (const key in todoData) {
					todos.push({ id: key, name: todoData[key].name });
				}
				setTodoList(todos);
			})
			.catch(err => console.log(err));
	}, []);

	const inputChangeHandler = event => {
		setTodoName(event.target.value);
	};

	const todoAddHandler = () => {
		axios
			.post('https://legacy-hooks-udemy.firebaseio.com/todos.json', { name: todoName })
			.then(res => {
				console.log(res);
				const todoItem = { id: res.data.name, name: todoName };
				setTodoList(todoList.concat(todoItem));
			})
			.catch(err => console.log(err));
	};

	return (
		<React.Fragment>
			<input type='text' placeholder='Todo' value={todoName} onChange={inputChangeHandler} />
			<button type='button' onClick={todoAddHandler}>
				Add
			</button>
			<ul>{todoList.map(item => <li key={item.id}>{item.name}</li>)}</ul>
		</React.Fragment>
	);
};

export default Todo;
