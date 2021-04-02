import React from 'react';
import Audio from './Audio';
import Typer from './Typer';
import logo from './logo.svg';

import * as testDialog from './dialogs/foo';

import './App.css';

function App() {
	const handleAudioReady = React.useCallback(audio => {
		audio.play().catch(() => {
			console.log('Waiting for user input to play audio...');
			const handler = () => {
				audio.play();
				document.removeEventListener('click', handler);
			};
			document.addEventListener('click', handler);
		});
	}, []);

	const [time, setTime] = React.useState(0);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Current time: <code>{time}</code>
				</p>
				<p style={{ width: '45rem', textAlign: 'left' }}>
					<Typer
						fragments={testDialog.dialog
							.filter(d => time >= d.t)
							.map(d => d.txt)}
					/>
				</p>
				<Audio
					onReady={handleAudioReady}
					onTimeUpdate={setTime}
					url={testDialog.audio}
				/>
			</header>
		</div>
	);
}

export default App;
