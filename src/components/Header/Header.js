import React from 'react';

const header = props => {
	const { onLoadTodos, onLoadAuth } = props;
	return (
		<header>
			<button onClick={onLoadTodos}>Todo List</button> | <button onClick={onLoadAuth}>Auth</button>
		</header>
	);
};

export default header;
