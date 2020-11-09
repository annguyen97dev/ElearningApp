import React from 'react';

import './styles.module.scss';

const DropQuestion = () => {
	function allowDrop(ev) {
		ev.preventDefault();
	}

	function drag(ev) {
		ev.dataTransfer.setData('text', ev.target.id);
	}

	function drop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData('text');
		ev.target.appendChild(document.getElementById(data));
	}
	return (
		<div className="drop-question">
			<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
				<div draggable="true" ondragstart="drag(event)" id="drag1">
					dadada
				</div>
			</div>
			<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
		</div>
	);
};
export default DropQuestion;
