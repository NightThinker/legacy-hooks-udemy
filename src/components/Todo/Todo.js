import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import List from '../List/List';
import { useFormInput } from '../../hooks/forms';

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
	const [ inputIsValid, setInputIsValid ] = useState(false);
	// const [ todoName, setTodoName ] = useState('');

	const [ todoList, dispatch ] = useReducer(todoListReducer, []);
	// const todoInputRef = useRef();
	const { value, onChange, validity } = useFormInput();

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

	// const inputValiadtionHandler = event => {
	// 	if (event.target.value.trim() === '') {
	// 		setInputIsValid(false);
	// 	} else {
	// 		setInputIsValid(true);
	// 	}
	// };

	const todoAddHandler = () => {
		// const todoName = todoInputRef.current.value;
		const todoName = value;
		console.log('value', todoName);

		axios
			.post('https://legacy-hooks-udemy.firebaseio.com/todos.json', { name: todoName })
			.then(res => {
				console.log(res);
				setTimeout(() => {
					const todoItem = { id: res.data.name, name: todoName };
					dispatch({ type: 'ADD', payload: todoItem });
				}, 300);
			})
			.catch(err => console.log(err));
	};

	const todoRemoveHandler = todoId => {
		axios
			.delete(`https://legacy-hooks-udemy.firebaseio.com/todos/${todoId}.json`)
			.then(res => {
				dispatch({ type: 'REMOVE', payloadId: todoId });
			})
			.catch(err => console.log(err));
	};

	return (
		<React.Fragment>
			<input
				type='text'
				placeholder='Todo'
				// ref={todoInputRef}
				// onChange={inputValiadtionHandler}
				onChange={onChange}
				value={value}
				style={{ background: validity === true ? 'transparent' : 'red' }}
			/>
			<button type='button' onClick={todoAddHandler}>
				Add
			</button>
			{useMemo(() => <List items={todoList} onClick={todoRemoveHandler} />, [ todoList ])}
		</React.Fragment>
	);
};

export default Todo;
