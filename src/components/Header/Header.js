import React, { useContext } from 'react';

import AuthContext from '../../context/auth-context';

const Header = props => {
	const { onLoadTodos, onLoadAuth } = props;
	const auth = useContext(AuthContext);
	return (
		<header>
			{auth.status && <button onClick={onLoadTodos}>Todo List</button>}
			<button onClick={onLoadAuth}>Auth</button>
		</header>
	);
};

export default Header;
