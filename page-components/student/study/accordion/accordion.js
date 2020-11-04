import React, { useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './accordion.scss';
import Chevron from './Chevron';

function Accordion(props) {
	const [setActive, setActiveState] = useState('');
	const [setHeight, setHeightState] = useState('0px');
	const [setRotate, setRotateState] = useState('accordion__icon');

	const content = useRef(null);

	function toggleAccordion() {
		setActiveState(setActive === '' ? 'active' : '');
		setHeightState(
			setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`,
		);
		setRotateState(
			setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate',
		);
	}

	return (
		<div className="sidebar-section accordion__section">
			<button
				className={`sidebar-section__header accordion ${setActive}`}
				onClick={toggleAccordion}
			>
				{/* <span>
						<FontAwesomeIcon icon="angle-down" />
					</span> */}
				<div className="accordion-title">
					<p className="title accordion__title">{props.title}</p>
					<span className="info">{props.info}</span>
				</div>
				<Chevron className={`${setRotate}`} width={7} fill={'#777'} />
			</button>
			<div
				ref={content}
				style={{ maxHeight: `${setHeight}` }}
				className="accordion__content"
			>
				<div
					className="accordion__text"
					dangerouslySetInnerHTML={{ __html: props.content }}
				/>
			</div>
		</div>
	);
}

export default Accordion;
