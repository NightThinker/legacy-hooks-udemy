import React from 'react';

const List = props => {
	console.log('Rendering Lis...');
	const { items, onClick } = props;
	return (
		<ul>
			{items.map(item => (
				<li key={item.id} onClick={onClick.bind(this, item.id)}>
					{item.name}
				</li>
			))}
		</ul>
	);
};

export default List;
