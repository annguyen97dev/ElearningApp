import React from 'react';
import Tabs from '~/page-components/student/study/tabs/tabs';
import Quiz from '~/page-components/student/study/quiz';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.module.scss';

const Main = () => {
	return (
		<div className="study__main">
			<div className="study__main--header">
				<div className="course">
					<div className="course__box">
						<FontAwesomeIcon icon="graduation-cap" />
						Khóa học
					</div>
					<div className="course__title">
						<h3 className="course__title--text">
							This is a course that we will learn
						</h3>
					</div>
				</div>
			</div>
			<Tabs>
				<div label="Bài học">
					<h4 className="title">What is a CSS Sprite</h4>
					<p>
						We need to know about an image sprite before we start talking about
						CSS sprites. An image sprite is a compilation of different image
						assets that we want to use on our web application.
					</p>
					<p>These images could fit in any of the below given cases…</p>
					<ul>
						<li>Icon assets like social media, fancy bullets etc.</li>
						<li>Different states for a button roll-over</li>
						<li>A fixed background eg. a logo</li>
					</ul>
					<div className="box-video">
						<ReactPlayer
							width="100%"
							height="500px"
							url="https://www.youtube.com/watch?v=3aQJ_OtIEFc"
						/>
					</div>
					<h4 className="title">What is a CSS Sprite</h4>
					<p>
						We need to know about an image sprite before we start talking about
						CSS sprites. An image sprite is a compilation of different image
						assets that we want to use on our web application.
					</p>
					<p>These images could fit in any of the below given cases…</p>
					<ul>
						<li>Icon assets like social media, fancy bullets etc.</li>
						<li>Different states for a button roll-over</li>
						<li>A fixed background eg. a logo</li>
					</ul>
				</div>
				<div label="Trắc nghiệm">
					<Quiz />
				</div>
			</Tabs>
		</div>
	);
};

export default Main;
