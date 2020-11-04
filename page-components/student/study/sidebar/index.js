import React, { useState, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from '~/page-components/student/study/accordion/accordion';
import './styles.module.scss';

const SideBar = () => {
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

	return (
		<div className="study__sidebar" style={{ height: getHeight + 'px' }}>
			<div className="study__sidebar--header">
				<button className="btn-toggle">
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
				<Accordion
					title="What is your return policy?"
					info="145 vide | 30 hours 15 min
				"
					content='
					<div class="accordion-box">
					<div class="style-checkbox">
						<input type="checkbox"></input>
					</div>
					<div class="topic">
						<p class="topic-title"><a>1. This is a topic English</a></p>
						<ul class="topic-list">
							<li><i class="fas fa-bookmark"></i>Bài học</li>
							<li><i class="fas fa-list-alt"></i>Bài quiz</li>
						</ul>
					</div>
				</div>
				<div class="accordion-box">
					<div class="style-checkbox">
						<input type="checkbox"></input>
					</div>
					<div class="topic">
						<p class="topic-title"><a>1. This is a topic English</a></p>
						<ul class="topic-list">
							<li><i class="fas fa-bookmark"></i>Bài học</li>
							<li><i class="fas fa-list-alt"></i>Bài quiz</li>
						</ul>
					</div>
				</div>
				<div class="accordion-box">
					<div class="style-checkbox">
						<input type="checkbox"></input>
					</div>
					<div class="topic">
						<p class="topic-title"><a>1. This is a topic English</a></p>
						<ul class="topic-list">
							<li><i class="fas fa-bookmark"></i>Bài học</li>
							<li><i class="fas fa-list-alt"></i>Bài quiz</li>
						</ul>
					</div>
				</div>
					'
				/>
				<Accordion
					title="Which languages does you support?"
					info="145 vide | 30 hours 15 min
				"
					content='
					<div class="accordion-box">
					<div class="style-checkbox">
						<input type="checkbox"></input>
					</div>
					<div class="topic">
						<p class="topic-title"><a>1. This is a topic English</a></p>
						<ul class="topic-list">
							<li><i class="fas fa-bookmark"></i>Bài học</li>
							<li><i class="fas fa-list-alt"></i>Bài quiz</li>
						</ul>
					</div>
				</div>
				<div class="accordion-box">
					<div class="style-checkbox">
						<input type="checkbox"></input>
					</div>
					<div class="topic">
						<p class="topic-title"><a>1. This is a topic English</a></p>
						<ul class="topic-list">
							<li><i class="fas fa-bookmark"></i>Bài học</li>
							<li><i class="fas fa-list-alt"></i>Bài quiz</li>
						</ul>
					</div>
				</div>'
				/>
				<Accordion
					title="Can I use a custom domain?"
					info="145 vide | 30 hours 15 min
				"
					content='<div class="accordion-box">
					<div class="style-checkbox">
						<input type="checkbox"></input>
					</div>
					<div class="topic">
						<p class="topic-title"><a>1. This is a topic English</a></p>
						<ul class="topic-list">
							<li><i class="fas fa-bookmark"></i>Bài học</li>
							<li><i class="fas fa-list-alt"></i>Bài quiz</li>
						</ul>
					</div>
				</div>
				<div class="accordion-box">
					<div class="style-checkbox">
						<input type="checkbox"></input>
					</div>
					<div class="topic">
						<p class="topic-title"><a>1. This is a topic English</a></p>
						<ul class="topic-list">
							<li><i class="fas fa-bookmark"></i>Bài học</li>
							<li><i class="fas fa-list-alt"></i>Bài quiz</li>
						</ul>
					</div>
				</div>
				<div class="accordion-box">
					<div class="style-checkbox">
						<input type="checkbox"></input>
					</div>
					<div class="topic">
						<p class="topic-title"><a>1. This is a topic English</a></p>
						<ul class="topic-list">
							<li><i class="fas fa-bookmark"></i>Bài học</li>
							<li><i class="fas fa-list-alt"></i>Bài quiz</li>
						</ul>
					</div>
				</div>
				<div class="accordion-box">
					<div class="style-checkbox">
						<input type="checkbox"></input>
					</div>
					<div class="topic">
						<p class="topic-title"><a>1. This is a topic English</a></p>
						<ul class="topic-list">
							<li><i class="fas fa-bookmark"></i>Bài học</li>
							<li><i class="fas fa-list-alt"></i>Bài quiz</li>
						</ul>
					</div>
				</div>
				<div class="accordion-box">
					<div class="style-checkbox">
						<input type="checkbox"></input>
					</div>
					<div class="topic">
						<p class="topic-title"><a>1. This is a topic English</a></p>
						<ul class="topic-list">
							<li><i class="fas fa-bookmark"></i>Bài học</li>
							<li><i class="fas fa-list-alt"></i>Bài quiz</li>
						</ul>
					</div>
				</div>
				'
				/>
			</div>
		</div>
	);
};

export default SideBar;
