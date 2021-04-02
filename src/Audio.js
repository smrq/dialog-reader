import React from 'react';
import useEventListener from '@use-it/event-listener';
import useInterval from '@use-it/interval';

export default function Audio({ url, onReady, onTimeUpdate }) {
	const [element, setElement] = React.useState(null);
	const [playing, setPlaying] = React.useState(false);

	const handleCanPlayThrough = React.useCallback(() => {
		onReady(element);
	}, [element, onReady]);

	useInterval(
		() => onTimeUpdate((element.currentTime * 1000) | 0),
		playing ? 33 : null
	);

	useEventListener('canplaythrough', handleCanPlayThrough, element);
	useEventListener(
		'pause',
		() => {
			setPlaying(false);
		},
		element
	);
	useEventListener(
		'play',
		() => {
			setPlaying(true);
		},
		element
	);

	return (
		<audio controls ref={setElement} src={url} preload="auto">
			Your browser does not support the <code>audio</code> element.
		</audio>
	);
}
