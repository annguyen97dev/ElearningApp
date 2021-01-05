import React, { useState, useLayoutEffect, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from '~/page-components/student/study/accordion/accordion';
import './styles.module.scss';
import { useCourse } from '~/pages/student/my-course/[courseid]';

const SideBar = (props) => {
	const { dataSection } = props;
	const { getActiveLesson, activeLesson } = useCourse();
	// const [activeLesson, setActiveLesson] = useState();

	// Caculator width and then do something when resize window
	function useWindowSize() {
		const [size, setSize] = useState([0, 0]);
		const [heightSidebar, setHeightSidebar] = useState(0);

		useLayoutEffect(() => {
			function updateSize() {
				setSize([window.innerWidth, window.innerHeight]);
				setHeightSidebar(window.innerHeight - 105);
			}
			window.addEventListener('resize', updateSize);
			updateSize();
			return () => window.removeEventListener('resize', updateSize);
		}, []);
		return heightSidebar;
	}

	// get Height from function
	const getHeight = useWindowSize();

	// Close and open siderbar
	const [btnToggle, setBtnToggle] = useState(false);

	function handleClick() {
		setBtnToggle(true);
		props.getStatus && props.getStatus();
	}

	// useEffect(() => {
	// 	let check = false;
	// 	dataSection.forEach((section) => {
	// 		if (!check) {
	// 			if (section.DataLesson.length > 0) {
	// 				setActiveLesson(section.DataLesson[0]);
	// 				getActiveLesson(section.DataLesson[0]);
	// 				check = true;
	// 			}
	// 		}
	// 	});
	// }, []);

	return (
		<div
			className={`study__sidebar ${btnToggle ? 'active-close' : 'active-open'}`}
			style={{ height: getHeight + 'px' }}
		>
			<div className="study__sidebar--header">
				<button className="btn-toggle" onClick={handleClick}>
					<FontAwesomeIcon icon="long-arrow-alt-right" />
				</button>
				<div className="status">
					<span>Đã hoàn thành</span>
					<div className="status-info">
						<p>24/25</p>
					</div>
				</div>
			</div>
			<div className="sidebar-content">
				{dataSection &&
					dataSection.map((section) => (
						<Accordion
							key={section.SectionID}
							title={section.SectionName}
							info={section.TotalTime}
							content={section.DataLesson}
							activeLesson={activeLesson}
							section={section}
						/>
					))}
			</div>
		</div>
	);
};

export default SideBar;
