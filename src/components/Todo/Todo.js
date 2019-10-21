import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const todoListReducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return state.concat(action.payload);
		case 'SET':
			return action.payload;
		case 'REMOVE':
			return state.filter(todo => todo.id !== action.payloadId);

		default:
			return state;
	}
};

const Todo = () => {
	const [ todoName, setTodoName ] = useState('');
	const [ submittedTodo, setSubmittedTodo ] = useState(null);
	// const [ todoList, setTodoList ] = useState([]);

	const [ todoList, dispatch ] = useReducer(todoListReducer, []);

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
				dispatch({ type: 'SET', payload: todos });
				// setTodoList(todos);
			})
			.catch(err => console.log(err));
	}, []);

	useEffect(
		() => {
			if (submittedTodo) {
				dispatch({ type: 'ADD', payload: submittedTodo });
				// setTodoList(todoList.concat(submittedTodo));
			}
		},
		[ submittedTodo ]
	);

	const inputChangeHandler = event => {
		setTodoName(event.target.value);
	};

	const todoAddHandler = () => {
		axios
			.post('https://legacy-hooks-udemy.firebaseio.com/todos.json', { name: todoName })
			.then(res => {
				console.log(res);
				setTimeout(() => {
					const todoItem = { id: res.data.name, name: todoName };
					// setTodoList(todoList.concat(todoItem));
					setSubmittedTodo(todoItem);
				}, 300);
			})
			.catch(err => console.log(err));
	};

	const todoRemoveHandler = todoId => {
		dispatch({ type: 'REMOVE', payloadId: todoId });
	};

	return (
		<React.Fragment>
			<input type='text' placeholder='Todo' value={todoName} onChange={inputChangeHandler} />
			<button type='button' onClick={todoAddHandler}>
				Add
			</button>
			<ul>
				{todoList.map(item => (
					<li key={item.id} onClick={todoRemoveHandler.bind(this, item.id)}>
						{item.name}
					</li>
				))}
			</ul>
		</React.Fragment>
	);
};

export default Todo;
