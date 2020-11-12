import React from 'react';
// import './App.css';

import VerticalDragList from './components/vertical-dnd.component';
import MultipleDragList from './components/multiple-list-dnd.component';
import Quiz from './components/quiz';

function App() {
	return (
		<div className="App">
			{/* <h3>Single Vertical List</h3>
			<VerticalDragList /> */}

			<h3>Quiz</h3>
			{/* <MultipleDragList /> */}
			<Quiz />
		</div>
	);
}

export default App;
