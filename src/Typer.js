import React from 'react';

export default function Typer({ fragments }) {
	const typed = React.useRef(new Map());

	const fluidTimeout = 500;

	React.useEffect(() => {
		const now = Date.now();
		const newTyped = new Map();
		for (let fragment of fragments) {
			newTyped.set(
				fragment,
				typed.current.has(fragment) ? typed.current.get(fragment) : now
			);
		}
		typed.current = newTyped;

		console.log(newTyped);
	}, [fragments]);

	const now = Date.now();
	return (
		<React.Fragment>
			{fragments.map(fragment =>
				now - typed.current.get(fragment) < fluidTimeout ? (
					<span className="fluid">{fragment}</span>
				) : (
					fragment
				)
			)}
		</React.Fragment>
	);
}
